/*
 * GET home page.
 */

exports.list = function(req, res){
  var data = require('../public/store-data.json');

  res.render('stores', { title: 'Stores', locals: {data: data }});
 
};