import { DataTypes, Model } from 'sequelize';
import db from '.';

class UserModel extends Model {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;

  // constructor(u: string, r: string, e: string, p: string) {
  //   super();
  //   this.username = u;
  //   this.role = r;
  //   this.email = e;
  //   this.password = p;
  // }
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  tableName: 'users',
  timestamps: false,
});

export default UserModel;
