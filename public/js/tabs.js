$(function(){
  var path = location.pathname;

  if (path.indexOf('heatmap') > -1) {
    $('a[href="/heatmaps"]').parent().addClass('active');
  }
  
  if (path.indexOf('graph') > -1) {
    $('a[href="/graphs"]').parent().addClass('active');
  }
  
  if (path.indexOf('scatter') > -1) {
    $('a[href="/scatters"]').parent().addClass('active');
  }
  
  $('a[href="' + path + '"]').parent().addClass('active');
});