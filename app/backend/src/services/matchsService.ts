import { Op } from 'sequelize';
import MatchsModel from '../database/models/matchsModel';
import ClubsModel from '../database/models/clubsModel';
import { Club } from '../interfaces/IClub';

class MatchService {
  public static async getAll() {
    try {
      const filtered = await MatchsModel.findAll({
        include: [
          { model: ClubsModel, as: 'homeClub', attributes: ['clubName'] },
          { model: ClubsModel, as: 'awayClub', attributes: ['clubName'] },
        ],
      });

      return filtered;
    } catch (error) { console.log(error); }
  }

  // public static changeRes(param: Club[]) {
  //   const newArray = param.map((obj) => ({
  //     ...obj,
  //     inProgress: obj.inProgress === 1,
  //   }));
  //   return newArray;
  // }

  public static async getAllEndSearch(inProgress: string) {
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
        }) as unknown as Club[];

        // const response = MatchService.changeRes(filtered);
        // console.log({ response });
        return filtered;
      }
    } catch (error) { console.log(error); }
  }
}

export default MatchService;
