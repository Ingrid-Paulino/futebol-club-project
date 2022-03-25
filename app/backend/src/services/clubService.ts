import validateError from '../utils';
import ClubsModel from '../database/models/clubsModel';

class ClubService {
  public static async getAll() {
    return ClubsModel.findAll();
  }

  public static async getById(id: number) {
    const club = await ClubsModel.findByPk(id);
    // console.log({ club });

    if (!club) return validateError(404, 'club does not exist');

    return club;
  }
}

export default ClubService;
