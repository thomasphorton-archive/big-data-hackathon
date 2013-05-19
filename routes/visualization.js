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

exports.heatmap = function(req, res) {

  var title;
  
  var searchParams = {};
  var storeWhitelist = [1,2,3,4,5];
  var segmentWhitelist = ['BEER', 'WINE', 'DELI', 'BAKERY'];
  
  if(req.params.store) {
    var store = parseInt(req.params.store);
    if (storeWhitelist.indexOf(store) > -1) {
      searchParams.STORE = store;
      storeString = 'Store #' + store;
    } else {
      storeString = 'Total ';
    }
  }
  
  if (req.params.segment) {
    segment = (req.params.segment).toUpperCase();
    if (segmentWhitelist.indexOf(segment) > -1) {
      searchParams[segment] = { $gt: 0 };
      segmentString = ' ' + req.params.segment + ' sales';
    } else {
      segmentString = 'sales in all segments';
    }
  }
  
  var weighted = req.params.weighted;
  
  title = storeString + segmentString;
  
  if(weighted) {
    title += ' weighted by ' + weighted;
  }
  
  database.collection('customerData', function(err, collection) {
    collection.find(searchParams)
    .toArray(function(err, customers) {
      var stores = require('../public/store-data.json');
      res.render('con-heatmap', {
        title: title,
        locals: {
          customers: customers,
          stores: stores,
          store: store,
          segment: segment,
          weighted: weighted
        }
      });
    });
  });
}

exports.graph = function(req, res) {

  var store = req.params.store;
   console.log(store);

  function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  var title;
  
  var searchParams = {};
  var storeWhitelist = [1,2,3,4,5];
  var segmentWhitelist = ['BEER', 'WINE', 'DELI', 'BAKERY'];
  
  if(req.params.store) {
    var store = parseInt(req.params.store);
    if (storeWhitelist.indexOf(store) > -1) {
      searchParams.STORE = store;
      storeString = 'Store #' + store;
    } else {
      storeString = 'Total ';
    }
  }
  
  if (req.params.segment) {
    segment = (req.params.segment).toUpperCase();
    if (segmentWhitelist.indexOf(segment) > -1) {
      searchParams[segment] = { $gt: 0 };
      segmentString = ' ' + req.params.segment + ' sales';
    } else {
      segmentString = ' sales in all segments';
    }
  }
  
  title = storeString + segmentString;

  var _outstanding = 0,
    _results = {};

  database.collection('customerData', function(err, collection) {
    for (var i = 2; i < 18; i++) {
      _outstanding++;
      getDay(collection, i, getDayCallback);
    }
  });

  function getDay (collection, day, callback) {
    sDay = pad(day, 2);
    eDay = pad(day + 1, 2);
  
    searchParams['DATE'] = { 
        $gte: sDay + 'APR13:00:00:00',
        $lt: eDay + 'APR13:00:00:00' 
      }
  
    collection.find(searchParams, function(err, cursor){
      cursor.toArray(function(err, data) {
        var counter = 0;
        if (!err) {
          for (var point in data)
            counter += parseInt(data[point].Total_Transaction * 100);
        }
        
        callback(err, day, counter);
      });
    });    
  }

  function getDayCallback (err, day, count) {
    // ...actually handle any errors, of course...
    _results[day] = count/100;
  
    if (--_outstanding === 0) { //display the results in-order when done
      for (var i = 2; i < 18; i++) {
        console.log(i, _results[i])
      }
      res.render('con-graph', {
        title: title,
        points: _results,
        store: store,
        segment: segment
      });
    }
  }
}  

exports.scatter = function(req, res, next) {
    
  var searchParams = {
  };
  var storeWhitelist = [1,2,3,4,5];
  var segmentWhitelist = ['BEER', 'WINE', 'DELI', 'BAKERY'];
  
  var comparisonWhitelist = ['WINE','BEER','BAKERY','DELI','HOUSEHOLD_NUM','HOUSE_LATITUDE','HOUSE_LONGITUDE','SEG_ID','DATE','STORE','LONGITUDE','LATITUDE','Total_Transaction','Distance','Store_Zip','Customer_Zip','HOUSEHOLD_','STATEFP','COUNTYFP','TRACTCE','NAME','Tract_Code','County,State','Population','Pct_Pop_Under_5','Pct_Pop_5_to_17','Pct_Pop_65_Plus','Median_Age','Pct_White','Pct_Black','Pct_Native','Pct_Asian','Pct_NHPI','Pct_Hispanic','Pct_HS_Grad','Pct_Clg_Grad','Pct_Non_Eng_Speakers','Median_HH_Inc','Median_Fam_Inc','Pct_Poverty','Median_House_Val'];
  
  comparison = {
    x: req.params.x,
    y: req.params.y
  }
  
  if(req.params.store) {
    var store = parseInt(req.params.store);
    if (storeWhitelist.indexOf(store) > -1) {
      searchParams.STORE = store;
      storeString = 'Store #' + store;
    } else {
      storeString = 'total ';
    }
  }
  
  if (req.params.segment) {
    segment = (req.params.segment).toUpperCase();
    if (segmentWhitelist.indexOf(segment) > -1) {
      searchParams[segment] = { $gt: 0 };
      segmentString = ' ' + req.params.segment + ' sales';
    } else {
      segmentString = 'sales in all segments';
    }
  }
  
   if (req.params.distance) {
    distance = parseInt(req.params.distance);
    searchParams['Distance'] = { $lte: distance };
  }
  
  var x = 'Median_HH_Inc';
  var y = 'Total_Transaction';
  
  title = comparison.x + ' vs. ' + comparison.y + ' for ' + storeString + segmentString;
  
  database.collection('customerData', function(err, collection) {
    collection.find(searchParams)
    .toArray(function(err, customers) {
      var stores = require('../public/store-data.json');
      res.render('con-scatter', {
        title: title,
        locals: {
          customers: customers,
          stores: stores,
          store: store,
          segment: segment,
          comparison: comparison
        }
      });
    });
  });
}
  

exports.pie = function(req, res, next) {
    
  var searchParams = {};
  var storeWhitelist = [1,2,3,4,5];
  var segmentWhitelist = ['BEER', 'WINE', 'DELI', 'BAKERY'];
  
  var method = req.params.method;
  
  if (method == 'store') {
    console.log('by store');
  } else if (method == 'segment') {
    console.log('by segment');
  }
  
  var select = req.params.select;
  
  if(req.params.store) {
    var store = parseInt(req.params.store);
    if (storeWhitelist.indexOf(store) > -1) {
      searchParams.STORE = store;
      storeString = 'Store #' + store;
    } else {
      storeString = 'Total ';
    }
  }
  
  if (req.params.segment) {
    segment = (req.params.segment).toUpperCase();
    if (segmentWhitelist.indexOf(segment) > -1) {
      searchParams[segment] = { $gt: 0 };
      segmentString = ' ' + req.params.segment + ' sales';
    } else {
      segmentString = 'sales in all segments';
    }
  }
  
  title = storeString + segmentString;
  
  database.collection('customerData', function(err, collection) {
    collection.find(searchParams)
    .toArray(function(err, customers) {
      var stores = require('../public/store-data.json');
      res.render('con-scatter', {
        title: title,
        locals: {
          customers: customers,
          stores: stores,
          store: store,
          segment: segment
        }
      });
    });
  });
}    