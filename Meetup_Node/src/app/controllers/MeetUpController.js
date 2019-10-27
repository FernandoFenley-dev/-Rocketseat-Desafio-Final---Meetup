import { Op } from 'sequelize';
import { parseISO, isBefore, startOfDay, endOfDay } from 'date-fns';

import * as Yup from 'yup';

import Meetup from '../models/Meetup';
import User from '../models/User';
import Banner from '../models/Banner';

class MeetUpController {
  async index(req, res) {
    const page = req.query.page || 1;

    if (!req.query.date) {
      return res.status(400).json({ error: 'É necessário fornecer uma data' });
    }

    const searchDate = Number(req.query.date);

    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Banner,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: [['date', 'ASC']],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      locale: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos ou branco. Verifique novamente' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas' });
    }

    const meetups = await Meetup.findAll({
      where: {
        date: req.body.date,
        owner_id: req.userId,
      },
    });

    if (meetups.length !== 0) {
      return res.status(400).json({
        error:
          'Você já possui um Meetup para este dia e horário. Escolha outra data ou horário',
      });
    }

    const meetup = await Meetup.create({
      owner_id: req.userId,
      ...req.body,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      locale: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos ou em branco. Verifique novamente' });
    }

    let meetup = await Meetup.findByPk(req.params.id, {
      where: {
        owner_id: req.userId,
      },
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup não encontrada' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'Não é possível atualizar meetups passadas' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas passadas não são permitidas' });
    }

    const meetups = await Meetup.findAll({
      where: {
        date: req.body.date,
        owner_id: req.userId,
        id: { [Op.ne]: req.params.id },
      },
    });

    if (meetups.length !== 0) {
      return res.status(400).json({
        error:
          'Você já possui um Meetup para este dia e horário. Escolha outra data ou um novo horário para seu evento',
      });
    }

    await meetup.update(req.body);

    meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: Banner,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(401).json({
        error: 'Meetup não encontrada',
      });
    }

    if (meetup.owner_id !== req.userId) {
      return res.status(401).json({
        error: 'Apenas o dono do Meetup pode cancelar este encontro',
      });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'Não é possível deletar meetups passadas' });
    }

    await meetup.destroy();

    return res.json(meetup);
  }
}

export default new MeetUpController();
