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
// const dumpUser = { email: 'user@user.com', password: 'secret_user' };
// const dumpUserBlankEmail = { email: '', password: 'secret_user' };
// const dumpUserWrongEmail = { email: 'pedrin@bala', password: 'secret_user' };
// const mock = {
//   id: 2,
//   username: 'User',
//   role: 'user',
//   email: 'user@user.com',
//   password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
//     // senha: secret_user
// };

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

  })
});
