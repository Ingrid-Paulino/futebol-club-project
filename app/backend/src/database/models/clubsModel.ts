import { DataTypes, Model } from 'sequelize';
import db from '.';
import MatchsModel from './matchsModel';

class ClubsModel extends Model {
  public id: number;

  public clubName: string;
}

ClubsModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    field: 'club_name',
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
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
ClubsModel.hasMany(MatchsModel, { foreignKey: 'id', as: 'home_team' });
ClubsModel.hasMany(MatchsModel, { foreignKey: 'id', as: 'away_team' });

MatchsModel.belongsTo(ClubsModel, { foreignKey: 'home_team', as: 'id' });
MatchsModel.belongsTo(ClubsModel, { foreignKey: 'away_team', as: 'id' });

export default ClubsModel;
