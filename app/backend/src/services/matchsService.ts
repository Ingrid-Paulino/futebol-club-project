import MatchsModel from '../database/models/matchsModel';

class MatchService {
  public static async getAll() {
    try {
      return await MatchsModel.findAll();
    } catch (error) { console.log(error); }
  }
}

export default MatchService;
