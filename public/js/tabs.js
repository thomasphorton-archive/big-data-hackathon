$(function(){
  var path = location.pathname;

  if (path.indexOf('store') > -1) {
    $('a[href="/stores"]').parent().addClass('active');
  }
  
  if (path.indexOf('segment') > -1) {
    $('a[href="/segments"]').parent().addClass('active');
  }
  
  $('a[href="' + path + '"]').parent().addClass('active');
});