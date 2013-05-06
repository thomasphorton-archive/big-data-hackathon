
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('foo');
  res.render('index', { title: 'Express', });
 
};

