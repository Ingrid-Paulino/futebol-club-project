import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

import MatchsModel from '../database/models/matchsModel';
import ClubsModel from '../database/models/clubsModel';
import { clubs } from './mocks/mockClubs';
import { match, matchs, clubDados} from './mocks/mockMatch';
// import CreateToken from '../services/createToken';


describe('Filtra todos os /match', () => {
    describe('Filtra todos os match', () => { 
        let chaiHttpResponse: Response;

    before(async () => {
        sinon.stub(MatchsModel, "findAll")
            .resolves( matchs as MatchsModel[]);
    });

    after(() => {
        (MatchsModel.findAll as sinon.SinonStub).restore();
    });

    it('Essa requisição deve retornar código de status 200', async () => {
        chaiHttpResponse = await chai.request(app).get('/matchs');
        expect(chaiHttpResponse).to.have.status(200);
        // expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(matchs);
    });

    it('chaiHttpResponse: O objeto possui a propriedade "id"', () => {
        expect(chaiHttpResponse.body[0]).to.have.property('id');
    })

    it('chaiHttpResponse: A requisição deve retornar um array no corpo da resposta', () => {
        expect(chaiHttpResponse.body).to.be.a('array');
    });

    it('chaiHttpResponse: A propriedade "id" possui o "id: 9"',
        () => {
            expect(chaiHttpResponse.body[0].id).to.be.equal(9);
        })
     })

      describe('Cria uma partida /match', () => { 
          let chaiHttpResponse: Response;
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkeGkuSHhrMWN6QU8wblpSLi5CMzkzdTEwYUVEMFJRMU4zUEFFWFE3SHh0TGpLUEVaQnUuUFcifSwiaWF0IjoxNjQ4MTM5NTE2LCJleHAiOjE2NDg3NDQzMTZ9.U58737uGsbbSzYrtcv1KXQhonoaYDSrNZTT_jIVAFps';
  
      before(async () => {
          sinon.stub(MatchsModel, "create")
              .resolves( match as MatchsModel);
      });
  
      after(() => {
          (MatchsModel.create as sinon.SinonStub).restore();
      });

      const body = {
        homeTeam: 10,
        awayTeam: 9,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: 1
      }
  
      it('Essa requisição deve retornar código de status 201', async () => {
          chaiHttpResponse = await chai.request(app).post('/matchs').set('Authorization', token).send(body);
          expect(chaiHttpResponse).to.have.status(201);
          // expect(chaiHttpResponse.status).to.be.equal(201);
          expect(chaiHttpResponse.body).to.be.deep.equal(match);
      });
  
      it('chaiHttpResponse: O objeto possui a propriedade "id"', () => {
          expect(chaiHttpResponse.body).to.have.property('id');
      })
  
      it('chaiHttpResponse: A requisição deve retornar um objeto no corpo da resposta', () => {
          expect(chaiHttpResponse.body).to.be.a('object');
      });
  
      it('chaiHttpResponse: A propriedade "id" possui o "id: 66"',
          () => {
              expect(chaiHttpResponse.body.id).to.be.equal(66);
          })
       })

     describe('Filtra pelo id do match finalizando a partida', () => { 
      let chaiHttpResponse: Response;

      before(async () => {
          sinon.stub(MatchsModel, "update")
              .resolves([1, match as unknown as MatchsModel[]]);
      });
  
      after(() => {
          (MatchsModel.update as sinon.SinonStub).restore();
      });
  
      it('Essa requisição deve retornar código de status 200', async () => {
          chaiHttpResponse = await chai.request(app).patch('/matchs/66/finish')
          expect(chaiHttpResponse).to.have.status(200);
          // expect(chaiHttpResponse.status).to.be.equal(200); 
      });

      it('chaiHttpResponse: A propriedade "message" possui o texto "Match finished!"',
          () => {
            expect(chaiHttpResponse.body.message).to.be.deep.equal('Match finished');
          })
  
      it('chaiHttpResponse: O objeto possui a propriedade "message"', () => {
          expect(chaiHttpResponse.body).to.have.property('message');
      })
  
      it('chaiHttpResponse: A requisição deve retornar um objeto no corpo da resposta', () => {
          expect(chaiHttpResponse.body).to.be.a('object');
      });
    })

     describe('Filtra pelo id do match', () => { 
        let chaiHttpResponse: Response;

        before(async () => {
            sinon.stub(MatchsModel, "update")
                .resolves([1, match as unknown as MatchsModel[]]);
        });
    
        after(() => {
            (MatchsModel.update as sinon.SinonStub).restore();
        });

        const body = {
          homeTeamGoals: 3,
          awayTeamGoals: 1
        }
    
        it('Essa requisição deve retornar código de status 200', async () => {
            chaiHttpResponse = await chai.request(app).patch('/matchs/66').send(body);
            expect(chaiHttpResponse).to.have.status(200);
            // expect(chaiHttpResponse.status).to.be.equal(200);
        });

        it('chaiHttpResponse: A propriedade "message" possui o texto "Successfully altered game!"',
            () => {
              expect(chaiHttpResponse.body.message).to.be.deep.equal('Successfully altered game!');
            })
    
        it('chaiHttpResponse: O objeto possui a propriedade "message"', () => {
            expect(chaiHttpResponse.body).to.have.property('message');
        })
    
        it('chaiHttpResponse: A requisição deve retornar um objeto no corpo da resposta', () => {
            expect(chaiHttpResponse.body).to.be.a('object');
        });
      })
})

describe('filtra os leaderboard', () => { 
    describe('rota /leaderboard', () => { 
        let chaiHttpResponse: Response;

        before(async () => {
            sinon.stub(ClubsModel, "findAll")
            .resolves(clubs as ClubsModel[]);
            sinon.stub(MatchsModel, "findAll")
            .resolves( matchs as MatchsModel[]);
        });
    
        after(() => {
            (MatchsModel.findAll as sinon.SinonStub).restore();
            (ClubsModel.findAll as sinon.SinonStub).restore();
        });
    
        it('Essa requisição deve retornar código de status 200', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard');
            // console.log(chaiHttpResponse);
            
            expect(chaiHttpResponse).to.have.status(200);
            // expect(chaiHttpResponse.status).to.be.equal(200);
        });

        it('Essa requisição deve retorna um array de objetos', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard');
            expect(chaiHttpResponse.body).to.be.deep.equal(clubDados);
        });
    
        it('chaiHttpResponse: O objeto possui a propriedade "name"', () => {
            expect(chaiHttpResponse.body[0]).to.have.property('name');
        })
    
        it('chaiHttpResponse: A requisição deve retornar um array no corpo da resposta', () => {
            expect(chaiHttpResponse.body).to.be.a('array');
        });
    
        it('chaiHttpResponse: A propriedade "name" possui o "Bahia"',
            () => {
                // console.log(chaiHttpResponse.body);
                
                expect(chaiHttpResponse.body[0].name).to.be.equal('Bahia');
            })
     })



     describe('rota /leaderboard/home', () => { 
        let chaiHttpResponse: Response;

        before(async () => {
            sinon.stub(ClubsModel, "findAll")
            .resolves(clubs as ClubsModel[]);
            sinon.stub(MatchsModel, "findAll")
                .resolves( matchs as MatchsModel[]);
        });
    
        after(() => {
            (MatchsModel.findAll as sinon.SinonStub).restore();
            (ClubsModel.findAll as sinon.SinonStub).restore();
        });
    
        it('Essa requisição deve retornar código de status 200', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
            expect(chaiHttpResponse).to.have.status(200);
            // expect(chaiHttpResponse.status).to.be.equal(200);
        });
    
        it('chaiHttpResponse: O objeto possui a propriedade "name"', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
            expect(chaiHttpResponse.body[0]).to.have.property('name');
        })
    
        it('chaiHttpResponse: A requisição deve retornar um array no corpo da resposta', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
            expect(chaiHttpResponse.body).to.be.a('array');
        });
    
        it('chaiHttpResponse: A propriedade "name" possui o "name: Bahia"',
            () => {
                expect(chaiHttpResponse.body[0].name).to.be.equal('Bahia');
            })
     })



     describe('rota /leaderboard/away', () => { 
        let chaiHttpResponse: Response;

        before(async () => {
            sinon.stub(ClubsModel, "findAll")
            .resolves(clubs as ClubsModel[]);
            sinon.stub(MatchsModel, "findAll")
                .resolves( matchs as MatchsModel[]);
        });
    
        after(() => {
            (MatchsModel.findAll as sinon.SinonStub).restore();
            (ClubsModel.findAll as sinon.SinonStub).restore();
        });
    
        it('Essa requisição deve retornar código de status 200', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
            expect(chaiHttpResponse).to.have.status(200);
            // expect(chaiHttpResponse.status).to.be.equal(200);
        });
    
        it('chaiHttpResponse: O objeto possui a propriedade "name"', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
            expect(chaiHttpResponse.body[0]).to.have.property('name');
        })
    
        it('chaiHttpResponse: A requisição deve retornar um array no corpo da resposta', async () => {
            chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
            expect(chaiHttpResponse.body).to.be.a('array');
        });
    
        it('chaiHttpResponse: A propriedade "name" possui o "name: Bahia"',
            () => {
                expect(chaiHttpResponse.body[0].name).to.be.equal('Bahia');
            })
     })
 })