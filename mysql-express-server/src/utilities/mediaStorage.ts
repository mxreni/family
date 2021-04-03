const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const { generateBytes } = GridFsStorage;

const storage = (bucketName) => {
  return new GridFsStorage({
    url: process.env.MONGO_DB_URL,
    file: (req, file) => {
      return new Promise(async (res, rej) => {
        try {
          let randFileName = await generateBytes();
          randFileName = randFileName.filename;
          const fileInfo = {
            filename: randFileName + path.extname(file.originalname),
            bucketName,
          };
          return res(fileInfo);
        } catch (err) {
          return rej(err);
        }
      });
    },
  });
};

module.exports = storage;
