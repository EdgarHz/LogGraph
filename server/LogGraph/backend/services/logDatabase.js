/**
 * Created by hzy on 5/9/16.
 */
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

function LogGraph() {
};
module.exports = LogGraph;

LogGraph.url = 'mongodb://localhost:27017/LogGraph';

LogGraph.connect = function(callback) {
    MongoClient.connect(this.url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        callback(db);
    });
};

LogGraph.insert = function(tagName, info, callback) {
    this.connect(function(db) {
        // Get the documents collection
        var collection = db.collection(tagName);
        // Insert some documents
        collection.insertMany(info, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted 1 documents into the collection");
            db.close();
            callback(result);
        });
    });
};

function findPoints(tagName, callback){
    var collection = db.collection(tagName);
    var cursor = collection.find().sort({"startTime":1});
    cursor.toArray(function(err, points){
        console.log(points);
        callback(points);
    });

}
LogGraph.find = function (tagName, callback) {
    this.connect(function (db) {
        if (tagName != undefined) {
            findPoints(tagName, callback);
        } else {
            db.collections(function (collections) {
                if (collections != null) {
                    tagName = collections[collections.length - 1].name;
                    findPoints(tagName, callback);
                } else {
                    callback(null);
                }
            });
        }

    });
    };
