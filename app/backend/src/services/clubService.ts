import validateError from '../utils';
import ClubsModel from '../database/models/clubsModel';

class ClubService {
  public static async getAll() {
    try {
      return await ClubsModel.findAll();
    } catch (error) { console.log(error); }
  }

  public static async getById(id: number) {
    try {
      const club = await ClubsModel.findByPk(id);
      if (!club) return validateError(404, 'club does not exist');
      return club;
    } catch (error) { console.log(error); }
  }
}

export default ClubService;
