import * as Joi from 'joi';
import { ILogin } from '../interfaces/ILogin';

const loginSchema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// forma 2 de fazer, ja passando a msg de erro desejada
/* const loginSchema = Joi.object({
      email: Joi.string().email().required()
        .messages({ 'email.string: "Erro: email é diferente de string"'}),
      password: Joi.string().min(6).required()
        .messages({ 'string.min: "Erro: password length must be 6 characters long"'}),
}); */

export default {
  loginSchema,
};
