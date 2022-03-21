import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import LoginController from '../controllers/loginController';
import { ILogin, LoginMock } from '../interfaces/ILogin';

import { Response } from 'superagent';
// import { LoginMock } from '../types' 

chai.use(chaiHttp);

const { expect } = chai;

// // describe('Seu teste', () => {
// //   /**
// //    * Exemplo do uso de stubs com tipos
// //    */

// //   // let chaiHttpResponse: Response;

// //   // before(async () => {
// //   //   sinon
// //   //     .stub(Example, "findOne")
// //   //     .resolves({
// //   //       ...<Seu mock>
// //   //     } as Example);
// //   // });

// //   // after(()=>{
// //   //   (Example.findOne as sinon.SinonStub).restore();
// //   // })

// //   // it('...', async () => {
// //   //   chaiHttpResponse = await chai
// //   //      .request(app)
// //   //      ...

// //   //   expect(...)
// //   // });

// //   it('Seu sub-teste', () => {
// //     expect(false).to.be.eq(true);
// //   });
// // });


// // describe('Rota /api/login', () => {
// //   describe('Consulta a lista de pessoas usuárias', () => {
// //     /**
// //    * Exemplo do uso de stubs com tipos
// //    */

// //   // let chaiHttpResponse: Response;

// //   before(async () => {
// //     sinon
// //       .stub(UserModel, "create")
// //       .resolves({
// //         ...<Seu mock>
// //       } as Example);
// //   });

// //   // after(()=>{
// //   //   (Example.findOne as sinon.SinonStub).restore();
// //   // })

// //   // it('...', async () => {
// //   //   chaiHttpResponse = await chai
// //   //      .request(app)
// //   //      ...

// //   //   expect(...)
// //   // });

// //   it('Seu sub-teste', () => {
// //     expect(false).to.be.eq(true);
// //   });
// //   })
  
// // });

// describe('Rota /api/login', () => {
//   describe('Testa se é possivel criar um login', () => {
//   const mock = {
//     user: {
//       email: 'email@gmail.com',
//       password: '12345678',
//       role: 'admin'
//     },
//     token: '111.222.222'
//   }

//   before(async () => {
//     sinon.stub(LoginController, "createLogin")
//       .resolves(mock as LoginMock);
//   });

//   after(()=>{
//     (LoginController.createLogin as sinon.SinonStub).restore();
//   })

//   describe('Verifica se usuario foi criado', () => { second })

//   let chaiHttpResponse: Response;

//   before(async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        .post('/login')
//   })

//   it('Essa requisição deve retornar código de status 200', async () => {
//     expect(chaiHttpResponse).to.have.status(200);
//   });
// });


describe('Insere um novo registro', () => {
  let createRequest: Response;
  const newLogin = {
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  };

  before(async () => {
      createRequest = await chai
          .request(app)
          .post('/login')
          .send(newLogin);
  });

it('createRequest: A requisição POST para a rota retorna o código de status 200', () => { 
  expect(createRequest).to.have.status(200);
});

it('createRequest: A requisição deve retornar um objeto no corpo da resposta', () => {
  expect(createRequest.body).to.be.a('object');
});


it('createRequest: O objeto possui a propriedade "email"', () => {
console.log('createRequest', createRequest);
  
  expect(createRequest.body.user).to.have.property('email');
});

it('createRequest: A propriedade "email" possui o texto "admin@admin.com"',
() => {
  expect(createRequest.body.user.email).to.be.equal('admin@admin.com');
})
});
