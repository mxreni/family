const path = require("path");
const GridFsStorage = require("multer-gridfs-storage");
const { generateBytes } = GridFsStorage;

const storage = (bucketName) => {
  return new GridFsStorage({
    url: "mongodb://localhost:27017/myfamily",
    file: (req, file) => {
      return new Promise(async (res, rej) => {
        try {
          let randFileName = await generateBytes();
          randFileName = randFileName.filename;
          const fileInfo = {
            filename:
              bucketName.toLowerCase() +
              "-" +
              randFileName +
              path.extname(file.originalname),
            bucketName: bucketName,
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
