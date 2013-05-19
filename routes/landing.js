/*
 * GET home page.
 */

exports.stores = function(req, res){
  var stores = require('../public/store-data.json');
  
  res.render('land-stores', { 
    title: 'Stores', 
    locals: { 
      stores: stores
    }
  });
};

exports.heatmaps = function(req, res) {  
  res.render('land-heatmaps', { 
    title: 'Transaction Heatmaps', 
    locals: {
      segments: [{
        title: 'beer'
      },
      {
        title: 'wine'
      },
      {
        title: 'bakery'
      },
      {
        title: 'deli'
      }]
    }
  });
};

exports.graphs = function(req, res) {  
  res.render('land-graphs', { 
    title: 'Transactions Over Time',
    locals: {
      segments: [{
        title: 'beer'
      },
      {
        title: 'wine'
      },
      {
        title: 'bakery'
      },
      {
        title: 'deli'
      }]
    }
  });
};

exports.scatters = function(req, res) {  
  res.render('land-scatters', { 
    title: 'Select Data to Plot:', 
    locals: {
      segments: [{
        title: 'beer'
      },
      {
        title: 'wine'
      },
      {
        title: 'bakery'
      },
      {
        title: 'deli'
      }]
    }
  });
};