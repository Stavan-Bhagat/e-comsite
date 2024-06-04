const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "e-commerce/users",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  },
});
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "e-commerce/products",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  },
});

const uploadUserImage = multer({ storage: userStorage });
const uploadProductImages = multer({ storage: productStorage });

module.exports = { uploadUserImage, uploadProductImages };
