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
const dumpUserBlankEmail = { email: '', password: 'secret_user' };
const dumpUserWrongEmail = { email: 'pedrin@bala', password: 'secret_user' };
const mock = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    // senha: secret_user
};

describe('login route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves(mock as User);
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

    it('token', async () => {  
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
  })

  describe('POST /login wrong email', () => {

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(dumpUserWrongEmail);
    });

    it('returns code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.be.a('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });


  })

  describe('GET /login/validate valid user', () => {
    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(dumpUser);
    });

    it('returns status code 200', async () => {
      let validUser = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', chaiHttpResponse.body.token);

      expect(validUser).to.have.status(200);
    });

  })

});
