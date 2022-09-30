import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('login route', () => {
  let chaiHttpResponse: Response;

  describe('POST /login valid user', () => {

    it('returns code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns token', async () => {  
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  })

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
