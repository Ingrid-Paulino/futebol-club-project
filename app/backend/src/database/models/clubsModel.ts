import { DataTypes, Model } from 'sequelize';
import db from '.';
import MatchsModel from './matchsModel';

class ClubModel extends Model {
  public id: number;

  public clubName: string;
}

ClubModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  clubName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  tableName: 'clubs',
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
ClubModel.hasMany(MatchsModel, { foreignKey: 'id', as: 'home_team' });
ClubModel.hasMany(MatchsModel, { foreignKey: 'id', as: 'away_team' });

export default ClubModel;
