import { DataTypes, Model } from 'sequelize';
import db from '.';

// interface IMatchsObj {
//   ht: number;
//   htg: number;
//   at: number;
//   atg: number;
//   ip: number;
// }

class MatchsModel extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: number;

  // constructor(matchsObj: IMatchsObj) {
  //   super();
  //   this.homeTeam = matchsObj.ht;
  //   this.homeTeamGoals = matchsObj.htg;
  //   this.awayTeam = matchsObj.at;
  //   this.awayTeamGoals = matchsObj.atg;
  //   this.inProgress = matchsObj.ip;
  // }
}

MatchsModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    field: 'home_team',
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    field: 'away_team',
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.INTEGER,
    field: 'in_progress',
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
});

export default MatchsModel;
