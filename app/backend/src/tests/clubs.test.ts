import * as mocha from 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

import ClubsModel from '../database/models/clubsModel';
import { clubs } from './mocks/mockClubs';

describe('Filtra todos os /clubs', () => {
    let chaiHttpResponse: Response;

    before(async () => {
        sinon.stub(ClubsModel, "findAll")
            .resolves(clubs as ClubsModel[]);
    });

    after(() => {
        (ClubsModel.findAll as sinon.SinonStub).restore();
    });

    it('Essa requisição deve retornar código de status 200', async () => {
        chaiHttpResponse = await chai.request(app).get('/clubs');
        expect(chaiHttpResponse).to.have.status(200);
        // expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(clubs);
    });

    it('chaiHttpResponse: O objeto possui a propriedade "clubName"', () => {
        // console.log('createRequest', createRequest);
        expect(chaiHttpResponse.body[0]).to.have.property('clubName');
    })

    it('chaiHttpResponse: A requisição deve retornar um array no corpo da resposta', () => {
        expect(chaiHttpResponse.body).to.be.a('array');
    });

    it('chaiHttpResponse: A propriedade "clubName" possui o texto "Avaí/Kindermann"',
        () => {
            expect(chaiHttpResponse.body[0].clubName).to.be.equal("Avaí/Kindermann");
        })
})