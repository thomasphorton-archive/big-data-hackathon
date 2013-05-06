/*
 * GET home page.
 */

exports.list = function(req, res){

  var customers = require('../public/customer-data.json');
  var stores = require('../public/store-data.json');

  res.render('customers', { 
    title: 'Customers',
    locals: {customers: customers,
      stores: stores
    }
  });
 
};