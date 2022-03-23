import { Op } from 'sequelize';
import MatchsModel from '../database/models/matchsModel';
import ClubsModel from '../database/models/clubsModel';

class MatchService {
  public static async getAll(inProgress: string) {
    try {
      if (inProgress === 'true') {
        const inProgressTrue = 1;
        const filtered = await MatchsModel.findAll({
          where: {
            [Op.or]: [{ inProgress: { [Op.like]: `%${inProgressTrue}%` } }],
          },
          include: [
            { model: ClubsModel, as: 'homeClub', attributes: ['clubName'] },
            { model: ClubsModel, as: 'awayClub', attributes: ['clubName'] },
          ],
        });
        return filtered;
      }

      return [];
    } catch (error) { console.log(error); }
  }
}

export default MatchService;
