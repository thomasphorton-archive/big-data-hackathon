/*
 * GET home page.
 */

  var Db = require('mongodb').Db;
  var Connection = require('mongodb').Connection;
  var Server = require('mongodb').Server;
  var BSON = require('mongodb').BSON;
  var ObjectID = require('mongodb').ObjectID;

  var database = new Db('hackathonclt', new Server('localhost', 27017, {auto_reconnect: true, safe: false}, {}));

database.open(function(err, database){
  if(!err) {
    console.log('connected to database');
    database.collection('customerData', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'customerData' collection doesn't exist.");
      }
    });
  }
});

exports.all = function(req, res, next){

  var customers = require('../public/customer-data.json');
  var stores = require('../public/store-data.json');

  res.render('hm-description', { 
    title: 'All Customer Data',
    locals: {
      customers: customers,
      stores: stores
    }
  });
 
};

exports.segment = function(req, res) {
  var title;
  var segment = req.params.segment.toUpperCase();
  var segmentList = ['BEER', 'WINE', 'BAKERY', 'DELI'];
  if (segmentList.indexOf(segment) < 0) {
    res.send("query doesn't exist, sorry!");
  } else {
    title = segment;
  }
  
  database.collection('customerData', function(err, collection) {
    collection.find({'DESCRIPTION': segment}).toArray(function(err, customers) {
      var stores = require('../public/store-data.json');
      res.render('hm-description', {
        title: title,
        locals: {
          customers: customers,
          stores: stores
        }
      });
    });
  });
}

exports.store = function(req, res) {
  
  var store = req.params.store;
  var title = 'Store Number ' + store;
  store = parseInt(store);
  
  database.collection('customerData', function(err, collection) {
    collection.find({'STORE': store}).toArray(function(err, customers) {
      var stores = require('../public/store-data.json');
      res.render('hm-store', {
        title: title,
        locals: {
          customers: customers,
          stores: stores
        }
      });
    });
  });
}