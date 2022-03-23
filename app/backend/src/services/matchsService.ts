import { Op } from 'sequelize';
import MatchsModel from '../database/models/matchsModel';
import ClubsModel from '../database/models/clubsModel';

class MatchService {
  public static async getAll(inProgress: string[]) {
    try {
      const filtered = await MatchsModel.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${inProgress}%` } },
            { content: { [Op.like]: `%${inProgress}%` } },
          ],
        },
        include: [
          { model: ClubsModel, as: 'homeClub', attributes: ['clubName'] },
          { model: ClubsModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      });

      return filtered;
    } catch (error) { console.log(error); }
  }
}

export default MatchService;
