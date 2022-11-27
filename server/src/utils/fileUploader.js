import fs from 'fs';

import logger from './logger';
import cloudinary from '../config/cloudinary';

/**
 * Uploads an image to Cloudinary && deletes the local image
 *
 * @param {string} fileString - fileString from the request
 * @param {string} folder - folder to upload the image to
 * @returns {Promise<string>} - url of the uploaded image
 */
export const uploadImage = async (fileString, folder) => {
  logger.info('Uploading image to cloudinary');
  try {
    if (!fs.existsSync(fileString)) {
      throw new Error('File not found!');
    }

    const upload = await cloudinary.uploader.upload(fileString, {
      folder,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'image',
    });

    fs.unlinkSync(fileString);

    return upload.secure_url;
  } catch (error) {
    logger.error('Failed to upload');
    fs.unlinkSync(fileString);
    throw error;
  }
};

/**
 * Deletes an image from Cloudinary
 * @param {string} fileString - fileString from the request
 * @param {string} folder - folder in which the image is located
 * @returns {Promise<string>} - url of the uploaded image
 */

export const deleteImage = async (fileString, folder) => {
  logger.info('Deleting image from cloudinary');
  try {
    const assetId = getImageCloudinaryId(fileString);
    if (assetId !== 'default') {
      const publicId = folder + '/' + assetId;
      const deleteResponse = await cloudinary.uploader.destroy(publicId);

      return deleteResponse.result;
    }
    return 'default';
  } catch {
    logger.error('Failed to delete');
    throw new Error('Failed to delete');
  }
};

/**
 * Get the publicId of an image from its url
 *
 * @param {string} imageUrl - url of the image
 * @returns {string} - publicId of the image
 */
export const getImageCloudinaryId = imageUrl => {
  const publicId = imageUrl.split('/').pop().split('.').shift();
  return publicId;
};

/**
 * Get the file name of an image from its url
 * @param {string} imageUrl - url of the image
 * @returns {string} - file name of the image
 *
 * @example
 * getImageFileName('https://images/1593640000-1-vaccine.jpg')
 * => 1-vaccine.jpg
 */
export const getImageFileName = fileString => {
  const fileName = fileString.split('/').pop().split('-').pop();

  return fileName;
};
