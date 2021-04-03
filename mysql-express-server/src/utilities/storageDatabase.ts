const { MongoClient, GridFSBucket, ObjectID } = require("mongodb");

exports.retrieveOne = async (bucketName, { prop }) => {
  let con = await MongoClient.connect(process.env.MONGO_DB_URL);
  let db = con.db("myfamily");
  let bucket = new GridFSBucket(db, {
    bucketName,
  });
  let files = `${bucketName}.files`;
  let result = await db.collection(files).findOne({ filename: prop });
  return {
    bucket,
    result,
  };
};

exports.retrieveMultiple = async (bucketName, { prop }) => {
  let con = await MongoClient.connect(process.env.MONGO_DB_URL);
  let db = con.db("myfamily");
  let bucket = new GridFSBucket(db, {
    bucketName,
  });
  let files = `${bucketName}.files`;
  let result = await db.collection(files).find({ prop }).toArray();
  return {
    bucket,
    result,
  };
};
