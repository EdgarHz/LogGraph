/**
 * Created by hzy on 5/9/16.
 */
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

function logDatabase() {
};

module.exports = logDatabase;
logDatabase.url = 'mongodb://localhost:27017/LogGraph';

logDatabase.connect = function(callback) {
    MongoClient.connect(this.url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        callback(db);
    });
};
logDatabase.insert = function(info, callback) {
    this.connect(function (db) {
        // Get the documents collection
        var collection = db.collection('points');
        // Insert some documents
        collection.insertMany(info, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted 1 documents into the collection");
            db.close();
            callback(result);
        });
    });
};