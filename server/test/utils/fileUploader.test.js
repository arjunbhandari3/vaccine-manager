import fs from 'fs';
import path from 'path';
import sinon from 'sinon';
import { expect } from 'chai';

import { uploadImage, deleteImage, getImageCloudinaryId, getImageFileName } from '../../src/utils/fileUploader';

describe('uploadImage', () => {
  beforeEach(() => {
    sinon.stub(fs, 'existsSync').returns(true);
    sinon.stub(fs, 'unlinkSync');
  });

  afterEach(() => {
    fs.existsSync.restore();
    fs.unlinkSync.restore();
  });

  it('should upload an image to Cloudinary and delete the local image', async () => {
    const file = '../../src/assets/images/vaccine.png';
    const fileString = path.join(__dirname, file);
    const folder = 'vaccine';
    const upload = await uploadImage(fileString, folder);
    expect(fs.unlinkSync.calledOnce).to.be.true;
    expect(upload).to.be.a('string');
  });

  it('should throw an error if the file is not found', async () => {
    fs.existsSync.returns(false);
    const fileString = path.join(__dirname, '../../src/assets/images/test.jpg');
    const folder = 'vaccine';

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
  it('should delete an image from Cloudinary', async () => {
    const file = '../../src/assets/images/vaccine.png';
    const fileString = path.join(__dirname, file);
    const folder = 'test';
    const deleteResponse = await deleteImage(fileString, folder);
    expect(deleteResponse).to.equal('deleted');
  });

  it('should return "default" if the assetId is "default"', async () => {
    const fileString = 'default';
    const folder = 'test';
    const deleteResponse = await deleteImage(fileString, folder);

    expect(deleteResponse).to.equal('default');
  });

  it('should throw an error if the image cannot be deleted', async () => {
    const file = '../../src/assets/images/vaccine.png';
    const fileString = path.join(__dirname, file);
    const folder = 'test';

    try {
      await deleteImage(fileString, folder);
      expect.fail('Error was not thrown');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Failed to delete');
    }
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
