import * as bcrypt from 'bcryptjs';
import validateError from '../utils';
import UserModel from '../database/models/usersModel';
import { ILogin } from '../interfaces/ILogin';
// import { User } from '../types';

class LoginService {
  static descriptografia(password: string, hash: string): boolean {
    bcrypt.compare(password, hash).then((res: boolean) => {
      if (!res) return false;
    });
    return true;
  }

  static async getAll() {
    return UserModel.findAll();
  }

  static async login({ email, password }: ILogin) {
    const hash = bcrypt.hashSync(password, 10);
    try {
      const check = LoginService.descriptografia(password, hash);
      const foundUser = await UserModel.findOne({ where: { email },
        attributes: { exclude: ['password'] },
      });
      if (!foundUser || !check) return validateError(400, 'Invalid fields');
      const userData = {
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
        },
      };
      return userData;
    } catch (error) { console.log(error); }
  }

  // public static async getRole(userId: number) {
  //   const user = await UserModel.findOne({ where: { id: userId } });
  //   // console.log({ user });

  //   const { role } = user as User;
  //   // console.log({ role });

  //   return role;
  // }
}

export default LoginService;
