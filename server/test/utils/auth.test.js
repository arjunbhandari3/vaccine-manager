import sinon from 'sinon';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../../src/config/config';
import { getHashedPassword, getSignedTokens, verifyToken } from '../../src/utils/auth';

const password = 'password';
let hashedPassword = '';

describe('auth', () => {
  describe('getHashedPassword', () => {
    it('should return a hashed password', async () => {
      hashedPassword = await getHashedPassword(password);
      expect(hashedPassword).to.be.a('string');
      expect(hashedPassword).to.not.equal(password);
    });
  });

  describe('comparePassword', () => {
    it('should return true for a matching password and hashed password', async () => {
      const result = await bcrypt.compare(password, hashedPassword);
      expect(result).to.be.true;
    });

    it('should return false for a non-matching password and hashed password', async () => {
      const result = await bcrypt.compare('invalidPassword', hashedPassword);
      expect(result).to.be.false;
    });
  });

  describe('getSignedTokens', () => {
    it('should return signed access and refresh tokens', () => {
      const data = { id: 1 };
      const tokens = getSignedTokens(data);
      expect(tokens).to.have.property('accessToken').that.is.a('string');
      expect(tokens).to.have.property('refreshToken').that.is.a('string');
    });
  });

  describe('verifyToken', () => {
    it('should verify an access token', () => {
      const data = { id: 1 };
      const accessToken = jwt.sign(data, config.token.access.secret, {
        expiresIn: config.token.access.expiresIn,
      });
      const result = verifyToken(accessToken);
      expect(result.id).to.deep.equal(data.id);
    });

    it('should verify a refresh token', () => {
      const data = { id: 1 };
      const refreshToken = jwt.sign(data, config.token.refresh.secret, {
        expiresIn: config.token.refresh.expiresIn,
      });
      const result = verifyToken(refreshToken, 'refresh');
      expect(result.id).to.deep.equal(data.id);
    });

    it('should throw an error for an invalid token', () => {
      const token = 'invalid';
      const verifyStub = sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));
      try {
        verifyToken(token);
      } catch (error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('Invalid token');
      } finally {
        verifyStub.restore();
      }
    });
  });
});
