var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var objectId = mongodb.ObjectID;
var mongoURL = 'mongodb://localhost:27017/colorcoat';
var db;

module.exports.connect = function(callback) {
    MongoClient.connect(mongoURL, function(err, database) {
      if(err) throw err;
      db = database;
      callback();
    });
}

module.exports.latestPalletes = function(callback) {
  var collection = db.collection('palletes');
  collection.find({}, function(err, result) {
    callback(result);
  });
}

module.exports.popularPalletes = function(callback) {
  var collection = db.collection('palletes');
  var sort = {
    "sort": [['likes','desc']]
  }
  collection.find({}, sort, function(err, result) {
    callback(result);
  });
}

module.exports.selectedPallete = function(id, callback) {
  var collection = db.collection('palletes');
  collection.find({"_id": objectId(id)}, function(err, result) {
    callback(result);
  });
}

module.exports.updateLikes = function(id, callback) {
  var collection = db.collection('palletes');
  collection.updateOne({"_id": objectId(id)}, {$inc: {"likes": 1}}, function(err, results) {
    collection.findOne(
      {"_id": objectId(id)},
      { "likes":1, "_id": 0},
      function(err, result) {
        callback(result);
      }
    );
  });
}
