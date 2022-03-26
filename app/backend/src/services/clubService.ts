import validateError from '../utils';
import ClubsModel from '../database/models/clubsModel';
import { StatusCodes, MSG } from '../enum';

class ClubService {
  public static async getAll() {
    return ClubsModel.findAll();
  }

  public static async getById(id: number) {
    const club = await ClubsModel.findByPk(id);
    if (!club) return validateError(StatusCodes.NOT_FOUND, MSG.CLUB_DOES_NOT_EXIST);
    return club;
  }
}

export default ClubService;
