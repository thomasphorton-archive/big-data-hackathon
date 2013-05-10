/*
 * GET home page.
 */

exports.list = function(req, res){
  var stores = require('../public/store-data.json');
  
  res.render('stores', { title: 'Stores', locals: {stores: stores }});
 
};