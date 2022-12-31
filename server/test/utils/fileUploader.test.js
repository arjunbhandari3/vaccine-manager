import fs from 'fs';
import path from 'path';
import sinon from 'sinon';
import { expect } from 'chai';

import { uploadImage, deleteImage, getImageCloudinaryId, getImageFileName } from '../../src/utils/fileUploader';

describe('uploadImage', () => {
  before(() => {
    sinon.stub(fs, 'existsSync').returns(true);
    sinon.stub(fs, 'unlinkSync');
  });

  after(() => {
    fs.existsSync.restore();
    fs.unlinkSync.restore();
  });

  it('should upload an image to Cloudinary and delete the local image', done => {
    const fileString = path.join(__dirname, '../../src/assets/images/test.png');
    const folder = 'test';

    uploadImage(fileString, folder).then(result => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('public_id');
      expect(result).to.have.property('secure_url');

      done();
    });
  });

  it('should throw an error if the file is not found', async () => {
    fs.existsSync.returns(false);
    const fileString = path.join(__dirname, '../../src/assets/images/test.pdf');
    const folder = 'test';

    try {
      await uploadImage(fileString, folder);
      expect.fail('Error was not thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('File not found!');
    }
  });
});
describe('deleteImage', () => {
  it('should delete an image from Cloudinary', done => {
    const fileString = 'src/assets/images/test/test.png';
    const folder = 'test';

    deleteImage(fileString, folder).then(result => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('result');
      expect(result.result).to.equal('ok');
      done();
    });
  }, 10000);

  it('should return "default" if the assetId is "default"', async () => {
    const fileString = 'default';
    const folder = 'test';
    const deleteResponse = await deleteImage(fileString, folder);

    expect(deleteResponse).to.equal('default');
  });
});

describe('getImageCloudinaryId', () => {
  it('should return the publicId of an image from its url', () => {
    const imageUrl = 'https://images/1593640000-1-vaccine.jpg';
    const publicId = getImageCloudinaryId(imageUrl);
    expect(publicId).to.equal('1593640000-1-vaccine');
  });
});

describe('getImageFileName', () => {
  it('should return the file name of an image from its url', () => {
    const fileString = 'https://images/1593640000-1-vaccine.jpg';
    const fileName = getImageFileName(fileString);
    expect(fileName).to.equal('vaccine.jpg');
  });
});
