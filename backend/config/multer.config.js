const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const {
  USER_IMAGE_FOLDER,
  USER_IMAGE_FORMATS,
  USER_IMAGE_TRANSFORMATION,
  PRODUCT_IMAGE_FOLDER,
  PRODUCT_IMAGE_FORMATS,
  PRODUCT_IMAGE_TRANSFORMATION
} = require('../constant/constant');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: USER_IMAGE_FOLDER,
    allowed_formats: USER_IMAGE_FORMATS,
    transformation: USER_IMAGE_TRANSFORMATION
  }
});

const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: PRODUCT_IMAGE_FOLDER,
    allowed_formats: PRODUCT_IMAGE_FORMATS,
    transformation: PRODUCT_IMAGE_TRANSFORMATION
  }
});

const uploadUserImage = multer({ storage: userStorage });
const uploadProductImages = multer({ storage: productStorage });

module.exports = { uploadUserImage, uploadProductImages };
