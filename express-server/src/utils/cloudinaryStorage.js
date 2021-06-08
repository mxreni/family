require("dotenv").config();
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USER,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = (bucketName) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: bucketName,
    },
  });
};

module.exports = storage;
