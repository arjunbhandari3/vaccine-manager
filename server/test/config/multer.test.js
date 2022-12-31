import path from 'path';
import sinon from 'sinon';
import { expect } from 'chai';

import CustomError from '../../src/utils/error';
import { fileFilter, getExtension, single } from '../../src/config/multer';

const imageFile = path.join(__dirname, '../../src/assets/images/test.png');
const gifFile = path.join(__dirname, '../../src/assets/images/cat.gif');

describe('multer', () => {
  describe('getExtension', () => {
    it('should return the extension of a file', () => {
      expect(getExtension('test.jpg')).to.equal('jpg');
      expect(getExtension('test.png')).to.equal('png');
      expect(getExtension('test.txt')).to.equal('txt');
    });
  });

  describe('multer.single', () => {
    let req, file, cb;

    beforeEach(() => {
      req = {
        user: { id: 1 },
        headers: { 'transfer-encoding': 'chunked' },
      };
      file = null;
      cb = sinon.fake();
    });

    it('should return a function', () => {
      expect(single('image')).to.be.a('function');
    });

    it('should return an error if file is not found', () => {
      fileFilter('image')(req, file, cb);
      expect(cb.called).to.be.true;
      expect(cb.args[0][0]).to.be.an.instanceOf(CustomError);
      expect(cb.args[0][0].message).to.equal('File not found!');
    });

    it('should return an error if file extension is not allowed', () => {
      file = { fieldname: 'image', originalname: gifFile };
      fileFilter('image')(req, file, cb);
      expect(cb.called).to.be.true;
      expect(cb.args[0][0]).to.be.an.instanceOf(CustomError);
      expect(cb.args[0][0].message).to.equal('Only files with extensions: jpg, jpeg, png are allowed');
    });

    it('should return an error if field name is not provided', () => {
      file = { originalname: imageFile };
      fileFilter()(req, file, cb);
      expect(cb.called).to.be.true;
      expect(cb.args[0][0]).to.be.an.instanceOf(CustomError);
      expect(cb.args[0][0].message).to.equal('Field name is required');
    });

    it('should return an error if field name does not match', () => {
      file = { fieldname: 'test', originalname: imageFile };
      fileFilter('image')(req, file, cb);
      expect(cb.called).to.be.true;
      expect(cb.args[0][0]).to.be.an.instanceOf(CustomError);
      expect(cb.args[0][0].message).to.equal('Field Name does not match');
    });

    it('should return true if all conditions are met', () => {
      file = { fieldname: 'image', originalname: imageFile };
      fileFilter('image')(req, file, cb);
      expect(cb.called).to.be.true;
      expect(cb.args[0][0]).to.be.null;
      expect(cb.args[0][1]).to.be.true;
    });
  });
});
