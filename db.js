const MongoClient = require('mongodb').MongoClient;
const dbName = 'fundraise-test';
const collectionName = 'donations';

const getMongoClient = async () => {
  return await MongoClient.connect(process.env.mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = {
  getMongoClient,
  dbName,
  collectionName
};
