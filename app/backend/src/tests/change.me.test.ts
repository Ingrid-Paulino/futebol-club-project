import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

import UserModel from '../database/models/usersModel';
import { userMock, userEveryMock, tokenMock } from './mocks/mockLogin';
import { MSG } from '../enum';
import { User, TUserModel, Token } from '../types';

import CreateToken from '../services/createToken';


chai.use(chaiHttp);
const { expect } = chai;

describe('Testa rota POST /login', () => {
    describe('Testa ao passar e-mail e senha corretos', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(UserModel, "findOne")
          .resolves(userMock as UserModel);
        sinon.stub(CreateToken, "createToken")
          .resolves(tokenMock as Token);
      });

      after(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
        (CreateToken.createToken as sinon.SinonStub).restore();
      })

      it('Essa requisição deve retornar código de status 200', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(userMock)
        expect(chaiHttpResponse).to.have.status(200);
      });
      it('Essa requisição deve retornar body.user', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(userMock)
        expect(chaiHttpResponse.body.user).to.be.deep.equal(userMock);
      });
      it('Essa requisição deve retornar body.token', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(tokenMock)
        expect(chaiHttpResponse.body.token).to.be.deep.equal(tokenMock);
      });

      it('Essa requisição deve retornar a resposta esperada', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({userMock, tokenMock})

        expect(chaiHttpResponse.body).to.be.deep.equal({userMock, tokenMock});
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

    describe('Testa se não passar senha', () => {
      let chaiHttpResponse: Response;

      const body = { email: 'name@email.com' }
      const response = { message: MSG.INVALID_FIELDS }

      it('Retorna status 401 e a mensagem "All fields must be filled"', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(body)

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body).to.be.deep.equal(response);
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
          expect(chaiHttpResponse.body).to.be.deep.equal(response);
        })

        // describe('Testa se senha é invalido ', () => { 
        //   let chaiHttpResponse: Response;

        //   const body = { email: 'name@email.com', password: '1a0)d*'}
        //   const response = { message: MSG.INCORRECT_EMAIL_PASSWORD}

        //   before(async () => {
        //     sinon.stub(UserModel, "findOne").resolves(userMock as UserModel);
        //   });

        //   after(()=>{
        //     (UserModel.findOne as sinon.SinonStub).restore();
        //   })

        //   it('Retorna status 401 e a mensagem "Incorrect email or password"', async () => { 
        //     chaiHttpResponse = await chai.request(app).post('/login').send(body)

        //     expect(chaiHttpResponse.status).to.be.equal(401);
        //     expect(chaiHttpResponse.body).to.be.deep.equal(response);
        //   })

        // describe('Ao passar um login inválido', () => {
        //   let chaiHttpResponse: Response;

        //   const body = { email: 'xablau@email.com', password: '123456:)' };
        //   const response = { message: ErrorMessages.INVALID_LOGIN };

        //   before(async () => { sinon.stub(User, "findOne").resolves(null); });
        //   after(()=>{(User.findOne as sinon.SinonStub).restore(); });

        //   it('retorna status 401 e a mensagem "Incorrect email or password"', async () => {
        //     chaiHttpResponse = await chai.request(app).post('/login').send(body);

        //     expect(chaiHttpResponse.status).to.be.equal(401);
        //     expect(chaiHttpResponse.body).to.be.deep.equal(response);
        //   });
        // });

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

      describe('Filtra todos os /login', () => {
        let chaiHttpResponse: Response;

        before(async () => {
          sinon.stub(UserModel, "findAll")
            .resolves(userEveryMock as UserModel[]);
        });

        after(() => {
          (UserModel.findAll as sinon.SinonStub).restore();
        })

        it('Essa requisição deve retornar código de status 200', async () => {
          chaiHttpResponse = await chai.request(app).get('/login');
          expect(chaiHttpResponse).to.have.status(200);
          // expect(chaiHttpResponse.status).to.be.equal(200);
          expect(chaiHttpResponse.body).to.be.deep.equal(userEveryMock);
        });

        it('chaiHttpResponse: O objeto possui a propriedade "email"', () => {
          // console.log('createRequest', createRequest);
          expect(chaiHttpResponse.body.user).to.have.property('email');
        })

        it('chaiHttpResponse: A requisição deve retornar um objeto no corpo da resposta', () => {
          expect(chaiHttpResponse.body).to.be.a('object');
        });

        it('chaiHttpResponse: A propriedade "email" possui o texto "admin@admin.com"',
          () => {
            expect(chaiHttpResponse.body.user.email).to.be.equal('admin@admin.com');
          })
      })
    });

    describe('Testa rota POST /login/validate', () => {
      let chaiHttpResponse: Response;
      const user = userMock as UserModel;

      before(async () => {
        sinon.stub(UserModel, "findOne").resolves(user);
      })

      after(() => {
        (UserModel.findOne as sinon.SinonStub).restore();
      })

      it('Testa o retorno do status 200 e o tipo de usuário', async () => {
        chaiHttpResponse = await chai.request(app).get('/login/validate');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.text).to.be.equal(user.role);
      })
    });
  });
// describe('Insere um novo registro', () => {
//   let createRequest: Response;
//   const newLogin = {
//     email: 'admin@admin.com',
//     password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
//   };

//   before(async () => {
//       createRequest = await chai
//           .request(app)
//           .post('/login')
//           .send(newLogin);
//   });

// it('createRequest: A requisição POST para a rota retorna o código de status 200', () => { 
//   expect(createRequest).to.have.status(200);
// });

// it('createRequest: A requisição deve retornar um objeto no corpo da resposta', () => {
//   expect(createRequest.body).to.be.a('object');
// });


// it('createRequest: O objeto possui a propriedade "email"', () => {
// // console.log('createRequest', createRequest);
//   expect(createRequest.body.user).to.have.property('email');
// });

// it('createRequest: A propriedade "email" possui o texto "admin@admin.com"',
// () => {
//   expect(createRequest.body.user.email).to.be.equal('admin@admin.com');
// })
// });