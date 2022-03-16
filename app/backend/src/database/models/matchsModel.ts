import { DataTypes, Model } from 'sequelize';
import db from '.';
import ClubModel from './clubsModel';

// interface IMatchsObj {
//   ht: number;
//   htg: number;
//   at: number;
//   atg: number;
//   ip: number;
// }

class MatchModel extends Model {
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

MatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  home_team: { type: DataTypes.INTEGER },
  home_team_goals: DataTypes.INTEGER,
  away_team: DataTypes.INTEGER,
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.INTEGER,
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Match',
  tableName: 'matchs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

MatchModel.belongsTo(ClubModel, { foreignKey: 'home_team', as: 'id' });
MatchModel.belongsTo(ClubModel, { foreignKey: 'away_team', as: 'id' });

export default MatchModel;
