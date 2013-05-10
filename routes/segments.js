/*
 * GET segments.
 */

exports.list = function(req, res) {  
  res.render('segments', { 
    title: 'Stores', 
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