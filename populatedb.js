#! /usr/bin/env node

console.log('This script populates some starter items to your database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []

function itemCreate(name, quality, creator, des, stats, special,d_creation, cb) {
  itemdetail = {name: name, quality: quality, creator: creator, description: des, stats: stats, special: special }
  if (d_creation != false) itemdetail.date_of_creation = d_creation
  
  var item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item);
  }  );
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate('Wood Sword', 'Common', 'Default', 'A weapon made of wood. It is mainly used for training.',
          [
            {att: 3},
            {str: 1}
          ], 'no special effect', false, callback);
        },
        function(callback) {
          itemCreate('Wood Shield', 'Common', 'Default', 'A shield made of wood.',
          [
            {def: 3},
            {block: 1}
          ], 'no special effect', false, callback);
        },
        function(callback) {
          itemCreate('Cloth Tunic', 'Common', 'Default', 'A thin piece of fabric, poorly made.',
          [
            {def: 1},
            {vit: 1}
          ], 'no special effect', false, callback);
        },
        function(callback) {
          itemCreate('Cloth Pants', 'Common', 'Default', 'A thin piece of fapric, poorly made.',
          [
            {def: 1},
            {vit: 1}
          ], 'no special effect', false, callback);
        },
        function(callback) {
          itemCreate('Tattered Boots', 'Common', 'Default', 'Shoes with poor integrity.',
          [
            {def: 1},
            {dex: 1}
          ], 'no special effect', false, callback);
        },
        function(callback) {
          itemCreate("Tattered Gloves", 'Common', 'Default', 'Overused gloves made to protect the hand.',
          [
            {att: 2},
            {str: 1}
          ], 'no special effect', false, callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+ items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



