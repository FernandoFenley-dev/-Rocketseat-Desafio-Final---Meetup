import { Op } from 'sequelize';
import { isBefore } from 'date-fns';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Banner from '../models/Banner';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date().getTime(),
            },
          },
          include: [
            {
              model: Banner,
              as: 'banner',
              attributes: ['id', 'path', 'url'],
            },
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
      order: [['meetup', 'date', 'ASC']],
    });

    res.json(subscriptions);
  }

  async store(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!meetup) {
      return res.status(400).json({
        error: 'Meetup inexistente.',
      });
    }

    if (meetup.past) {
      return res.status(400).json({
        error: 'Não é possível se inscrever em meetups passadas.',
      });
    }

    if (meetup.owner_id === req.userId) {
      return res.status(400).json({
        error:
          'Você é o organizador desta meetup. Portanto, não é possível se inscrever.',
      });
    }

    const checkIsAlreadySubscribed = await Subscription.findAll({
      where: {
        user_id: req.userId,
        meetup_id: req.params.meetupId,
      },
    });

    if (checkIsAlreadySubscribed.length !== 0) {
      return res.status(400).json({
        error: 'Você já está inscrito nesta meetup.',
      });
    }

    const checkAvailability = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkAvailability.length !== 0) {
      return res.status(400).json({
        error:
          'Não é possível se inscrever em dois eventos de mesma data e hora.',
      });
    }

    const subscriber = await User.findByPk(req.userId);

    const subscription = await Subscription.create({
      user_id: req.userId,
      meetup_id: meetup.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      subscriber,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(
      req.params.subscriptionId,
      {
        include: [
          {
            model: Meetup,
            as: 'meetup',
            required: true,
          },
        ],
      }
    );

    if (!subscription) {
      return res.status(401).json({
        error: 'Inscrição não encontrada.',
      });
    }

    if (subscription.user_id !== req.userId) {
      return res.status(401).json({
        error: 'Apenas o dono da inscrição pode deletá-la.',
      });
    }

    if (isBefore(subscription.meetup.date, new Date())) {
      return res.status(400).json({
        error: 'Não é possível cancelar inscrições de meetups passadas.',
      });
    }

    await subscription.destroy();

    return res.json(subscription);
  }
}

export default new SubscriptionController();
