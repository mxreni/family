const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const { generateBytes } = GridFsStorage;

const storage = (bucketName) => {
  // create new gridfsstorage
  return new GridFsStorage({
    //   url
    url: process.env.MONGO_DB_URL,
    // file
    file: (req, file) => {
      return new Promise(async (res, rej) => {
        try {
          let randFileName = await generateBytes();
          randFileName = randFileName.filename;
          // filename
          const fileInfo = {
            filename: randFileName + path.extname(file.originalname),
            bucketName,
          };
          // resolve with fileinfo with filename and bucketname
          return res(fileInfo);
        } catch (err) {
          return rej(err);
        }
      });
    },
  });
};

module.exports = storage;
