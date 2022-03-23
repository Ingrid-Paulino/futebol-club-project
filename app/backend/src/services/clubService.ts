import ClubsModel from '../database/models/clubsModel';

class ClubService {
  public static async getAll() {
    try {
      return await ClubsModel.findAll();
    } catch (error) { console.log(error); }
  }
}

export default ClubService;
