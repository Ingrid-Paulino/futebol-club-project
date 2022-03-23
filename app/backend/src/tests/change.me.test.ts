import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import UserModel from '../database/models/usersModel';
import { userMock, userEveryMock, tokenMock } from './mocks/mockLogin';
import { MSG } from '../enum';
import { User, TUserModel, Token, UserEveryMock } from '../types';

import CreateToken from '../services/createToken';


chai.use(chaiHttp);
const { expect } = chai;

describe('Testa rota POST /login', () => {
  describe('Testa ao passar e-mail e senha corretos', () => {
    let chaiHttpResponse: Response;

    const body = {
      email: "name@email.com",
      password: "12345678"
    }

    before(async () => {
      sinon.stub(UserModel, "findOne")
        .resolves(userMock as UserModel);
      sinon.stub(CreateToken, "createToken")
        .returns(tokenMock as Token);
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
      (CreateToken.createToken as sinon.SinonStub).restore();
    })

    it('Essa requisição deve retornar código de status 200', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(body)
      expect(chaiHttpResponse).to.have.status(200);
    });
    it('Essa requisição deve retornar body.user', async () => {
      // console.log(chaiHttpResponse);

      chaiHttpResponse = await chai.request(app).post('/login').send(body)
      expect(chaiHttpResponse.body.user).to.be.deep.equal(userMock);
    });
    it('Essa requisição deve retornar body.token', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(body)
      expect(chaiHttpResponse.body.token).to.be.equal(tokenMock);
    });

    it('Essa requisição deve retornar a resposta esperada', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(body)

      expect(chaiHttpResponse.body).to.be.deep.equal({ user: userMock, token: tokenMock });
    });
    //ou
    it('Essa requisição deve retornar a resposta esperada com a chave text de chaiHttpResponse', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(body)

      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify({ user: userMock, token: tokenMock }));
    });
  });

  describe('Testa se não passar e-mail', () => {
    let chaiHttpResponse: Response;
    const body = { password: '123456' }
    const response = { message: MSG.INVALID_FIELDS }

    it('Retorna status 401 e a mensagem "All fields must be filled"', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(body)

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.be.deep.equal(response);
    })
  })

  describe('Quando email e senha não são passados', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);
      chaiHttpResponse = await chai.request(app).post('/login').send()
    });

    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    })

    it('deve retornar o status "401"', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Deve retornar a mensagem: "All fields must be filled"', () => {
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.eq('All fields must be filled');
    });
  });

  describe('Testa se e-mail é invalido ', () => {
    let chaiHttpResponse: Response;
    const body = { email: 'email.com', password: '123456' }
    const response = { message: MSG.INCORRECT_EMAIL_PASSWORD }

    it('Retorna status 401 e a mensagem "Incorrect email or password"', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(body)

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(response);
    })

    describe('Testa se não passar senha', () => {
      let chaiHttpResponse: Response;
      const body = { email: 'name@email.com' }
      const response = { message: MSG.INVALID_FIELDS }

      before(async () => {
        sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);
      });

      after(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      })

      it('Retorna status 401 e a mensagem "All fields must be filled"', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(body)

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal(response);
      })

      describe('Ao passar um login inválido', () => {
        let chaiHttpResponse: Response;

        const body = { email: 'xablau@email.com', password: '123456:)' };
        const response = { message: MSG.INVALID_FIELDS };

        before(async () => { sinon.stub(UserModel, "findOne").resolves(null); });
        after(() => { (UserModel.findOne as sinon.SinonStub).restore(); });

        it('retorna status 401 e a mensagem "Incorrect email or password"', async () => {
          chaiHttpResponse = await chai.request(app).post('/login').send(body);

          expect(chaiHttpResponse.status).to.be.equal(401);
          expect(chaiHttpResponse.body).to.be.deep.equal(response);
        });
      });

      describe('Quando o email não é valido', () => {
        let chaiHttpResponse: Response;

        before(async () => {
          sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);
          chaiHttpResponse = await chai.request(app).post('/login').send(userMock)
        });

        after(() => {
          (UserModel.findOne as sinon.SinonStub).restore();
        })

        it('Deve retornar o status "401"', () => {
          expect(chaiHttpResponse).to.have.status(401);
        })

        it('Deve retornar a mensagem: "Incorrect email or password" ', () => {
          expect(chaiHttpResponse.body).to.have.property('message');
          expect(chaiHttpResponse.body.message).to.eq("Incorrect email or password");
        })
      })
    })

//     describe('Filtra todos os /login', () => {
//       let chaiHttpResponse: Response;

//       before(async () => {
//         sinon.stub(UserModel, "findAll")
//           .resolves(userEveryMock as UserEveryMock);
//       });

//       after(() => {
//         (UserModel.findAll as sinon.SinonStub).restore();
//       })

//       it('Essa requisição deve retornar código de status 200', async () => {
//         chaiHttpResponse = await chai.request(app).get('/login');
//         expect(chaiHttpResponse).to.have.status(200);
//         // expect(chaiHttpResponse.status).to.be.equal(200);
//         expect(chaiHttpResponse.body).to.be.deep.equal(userEveryMock);
//       });

//       it('chaiHttpResponse: O objeto possui a propriedade "email"', () => {
//         // console.log('createRequest', createRequest);
//         expect(chaiHttpResponse.body.user).to.have.property('email');
//       })

//       it('chaiHttpResponse: A requisição deve retornar um objeto no corpo da resposta', () => {
//         expect(chaiHttpResponse.body).to.be.a('object');
//       });

//       it('chaiHttpResponse: A propriedade "email" possui o texto "admin@admin.com"',
//         () => {
//           expect(chaiHttpResponse.body.user.email).to.be.equal('admin@admin.com');
//         })
//     })
//   });

//   describe('Testa rota POST /login/validate', () => {
//     let chaiHttpResponse: Response;
//     const user = userMock as UserModel;

//     before(async () => {
//       sinon.stub(UserModel, "findOne").resolves(user);
//     })

//     after(() => {
//       (UserModel.findOne as sinon.SinonStub).restore();
//     })

//     it('Testa o retorno do status 200 e o tipo de usuário', async () => {
//       chaiHttpResponse = await chai.request(app).get('/login/validate');

//       expect(chaiHttpResponse.status).to.be.equal(200);
//       expect(chaiHttpResponse.text).to.be.equal(user.role);
//     })
//   });
}) })