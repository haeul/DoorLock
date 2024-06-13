const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect("mongodb+srv://dks729927:dks729927@cluster0.nva1cwo.mongodb.net/")
    .then(client => {
      console.log("Door Lock Mongo Conneted!");
      _db = client.db("user");
      callback();
    })
    .catch(err => {
      console.log("Mongo err:", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
