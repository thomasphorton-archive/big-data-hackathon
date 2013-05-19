var xWhiteList =['WINE','BEER','BAKERY','DELI','HOUSE_LATITUDE','HOUSE_LONGITUDE','SEG_ID','STORE','LONGITUDE','LATITUDE','Total_Transaction','Distance','Store_Zip','Customer_Zip','HOUSEHOLD_','COUNTYFP','NAME','Tract_Code','Population','Pct_Pop_Under_5','Pct_Pop_5_to_17','Pct_Pop_65_Plus','Median_Age','Pct_White','Pct_Black','Pct_Native','Pct_Asian','Pct_NHPI','Pct_Hispanic','Pct_HS_Grad','Pct_Clg_Grad','Pct_Non_Eng_Speakers','Median_HH_Inc','Median_Fam_Inc','Pct_Poverty','Median_House_Val'];

$(function(){
  
  var xOptions = '';
  
  var comparisonX = $('#x');
  var storeSelect = $('#store');
  var segmentSelect = $('#segment');
  
  
  $.each(xWhiteList, function(){
    xOptions += '<option val="' + this + '">' + this + '</option>';
  });
    
  $('#x').append(xOptions);

  var comparison = {}
  
  $('.generate').click(function(e){
    e.preventDefault();
    comparison.X = comparisonX.val();
    store = storeSelect.val();
    segment = segmentSelect.val();    
    var url = '/heatmap/store/' + store + '/segment/' + segment + '/' + comparison.X;
    
    window.location.href = url;
    
  });
});