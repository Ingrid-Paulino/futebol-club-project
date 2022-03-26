import * as bcrypt from 'bcryptjs';
import validateError from '../utils';
import UserModel from '../database/models/usersModel';
import { ILogin } from '../interfaces/ILogin';
import { StatusCodes, MSG } from '../enum';

class LoginService {
  static descriptografia(password: string, hash: string): boolean {
    bcrypt.compare(password, hash).then((res: boolean) => {
      if (!res) return false;
    });
    return true;
  }

  static async login({ email, password }: ILogin) {
    const hash = bcrypt.hashSync(password, 10);
    const check = LoginService.descriptografia(password, hash);
    const foundUser = await UserModel.findOne({ where: { email },
      attributes: { exclude: ['password'] },
    });

    if (!foundUser || !check) {
      return validateError(StatusCodes.UNAUTHORIZED, MSG.INCORRECT_EMAIL_PASSWORD);
    }

    const userData = {
      user: {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
      },
    };
    return userData;
  }
}

export default LoginService;
