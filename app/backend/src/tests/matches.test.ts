import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/userModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// mocks
const dumpUser = { email: 'user@user.com', password: 'secret_user' };
const dumpMatch = {
  homeTeam: 100,
  awayTeam: 16,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

describe('matches route', () => {
  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(User, 'findOne')
  //     .resolves({ } as User);
  // }); // rev. testes de integração

  // after(()=>{
  //   (User.findOne as sinon.SinonStub).restore();
  // })

  describe('GET /matches OK', () => {

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get('/matches');
    });

    it('returns code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns cute array', async () => {  
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('returns teams names', async () => {  
      expect(chaiHttpResponse.body[0]).to.have.property('teamHome');
      expect(chaiHttpResponse.body[0]).to.have.property('teamAway');
    });

  })

  describe('POST /matches', () => {
    let validateLogin: Response;
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(dumpUser);

     validateLogin = await chai
     .request(app)
     .post('/matches')
     .set('authorization', chaiHttpResponse.body.token)
     .send(dumpMatch);
    });

    it('returns code 404', async () => {
      expect(validateLogin).to.have.status(404);
    });
    it('returns message', async () => {
      expect(validateLogin.body).to.have.property('message');
    });
  })


});
