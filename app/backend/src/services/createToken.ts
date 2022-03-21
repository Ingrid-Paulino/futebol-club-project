import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Payload, Secret, Token } from '../types';

class CreateToken {
  static createToken(payload: Payload): Token {
    const SECRET: Secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

    // const jwtConfig: JwtConfig = {
    //   expiresIn: '7d',
    //   algorithm: 'HS256',
    // };

    const token = jwt.sign({ data: payload }, SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    return token;
  }
}

export default CreateToken;
