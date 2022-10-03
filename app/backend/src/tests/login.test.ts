import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/userModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const dumpUser = { email: 'user@user.com', password: 'secret_password' };
const dumpUserBlankEmail = { email: '', password: 'secret_password' };

describe('login route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves({ } as User);
  }); // rev. testes de integração

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  describe('POST /login valid user', () => {

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(dumpUser);
    });

    it('returns code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns token', async () => {  
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  })

  describe('POST /login blank email', () => {

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(dumpUserBlankEmail);
    });

    it('returns code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    // it('', async () => {  
    //   expect(chaiHttpResponse).to.have.property('');
    // });
  })

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
