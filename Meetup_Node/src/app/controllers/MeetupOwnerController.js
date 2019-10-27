import Meetup from '../models/Meetup';
import Banner from '../models/Banner';

class MeetupOwnerController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { owner_id: req.userId },
      include: [
        {
          model: Banner,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: [['date', 'ASC']],
    });

    return res.json(meetups);
  }
}
export default new MeetupOwnerController();
