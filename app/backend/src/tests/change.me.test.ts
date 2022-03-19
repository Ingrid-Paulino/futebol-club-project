import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import UserModel from '../database/models/usersModel'
import { Login } from '../interfaces/Ilogin'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});


describe('Rota /api/login', () => {
  describe('Consulta a lista de pessoas usuárias', () => {
    /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "create")
      .resolves({
        ...<Seu mock>
      } as Example);
  });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
  })
  
});

describe('Rota /api/login', () => {
  describe('Testa se é possivel criar um login', () => {
  const mock = {
    email: 'email@gmail.com',
    password: '12345678',
  }

  before(async () => {
    sinon.stub(UserModel, "create")
      .resolves( mock as Login);
  });

  after(()=>{
    (UserModel.create as sinon.SinonStub).restore();
  })

  describe('Verifica se usuario foi criado', () => { second })

  let chaiHttpResponse: Response;

  before(async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
  })

  it('Essa requisição deve retornar código de status 200', async () => {
    expect(chaiHttpResponse).to.have.status(200);
  });
});


describe('Insere um novo registro', () => {
  let createRequest = {};
  const newLogin = {
    email: 'email@gmail.com',
    password: '12345678',
  };

  before(async () => {
      createRequest = await chai
          .request(app)
          .post('/login')
          .send(newLogin);
  });

it('createRequest: A requisição POST para a rota retorna o código de status 201', () => { 
  expect(createRequest).to.have.status(201);
});

it('createRequest: A requisição deve retornar um objeto no corpo da resposta', () => {
  expect(createRequest.body).to.be.a('object');
});

it('createRequest: O objeto possui a propriedade "email"', () => {
  expect(createRequest.body).to.have.property('email');
});

it('createRequest: A propriedade "email" possui o texto "email@gmail.com"',
() => {
  expect(createRequest.body.message).to.be.equal('email@gmail.com');
});

