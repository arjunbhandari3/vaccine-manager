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
export const uploadImageToCloudinary = async (fileString, folder) => {
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
 * @param {string} folder - folder to upload the image to
 * @returns {Promise<string>} - url of the uploaded image
 */

export const deleteImageFromCloudinary = async fileString => {
  logger.info('Deleting image from cloudinary');
  try {
    const assetId = getImageCloudinaryId(fileString);
    if (assetId !== 'default') {
      const publicId = 'vaccines' + '/' + getImageCloudinaryId(fileString);
      const deleteResponse = await cloudinary.uploader.destroy(publicId);

      return deleteResponse.result;
    }
    return 'ok';
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
