var xWhiteList =['WINE','BEER','BAKERY','DELI','HOUSE_LATITUDE','HOUSE_LONGITUDE','SEG_ID','DATE','STORE','LONGITUDE','LATITUDE','Total_Transaction','Distance','Store_Zip','Customer_Zip','HOUSEHOLD_','COUNTYFP','NAME','Tract_Code','Population','Pct_Pop_Under_5','Pct_Pop_5_to_17','Pct_Pop_65_Plus','Median_Age','Pct_White','Pct_Black','Pct_Native','Pct_Asian','Pct_NHPI','Pct_Hispanic','Pct_HS_Grad','Pct_Clg_Grad','Pct_Non_Eng_Speakers','Median_HH_Inc','Median_Fam_Inc','Pct_Poverty','Median_House_Val'];

var yWhiteList =['WINE','BEER','BAKERY','DELI','HOUSE_LATITUDE','HOUSE_LONGITUDE','SEG_ID','DATE','STORE','LONGITUDE','LATITUDE','Total_Transaction','Distance','Store_Zip','Customer_Zip','HOUSEHOLD_','STATEFP','COUNTYFP','TRACTCE','Tract_Code','County,State','Population','Pct_Pop_Under_5','Pct_Pop_5_to_17','Pct_Pop_65_Plus','Median_Age','Pct_White','Pct_Black','Pct_Native','Pct_Asian','Pct_NHPI','Pct_Hispanic','Pct_HS_Grad','Pct_Clg_Grad','Pct_Non_Eng_Speakers','Median_HH_Inc','Median_Fam_Inc','Pct_Poverty','Median_House_Val'];

$(function(){
  
  var xOptions = '',
    yOptions = '';
  
  var comparisonX = $('#x'),
    comparisonY = $('#y'),
    storeSelect = $('#store'),
    segmentSelect = $('#segment');

  
  $.each(xWhiteList, function(){
    xOptions += '<option val="' + this + '">' + this + '</option>';
  });
  
   $.each(yWhiteList, function(){
    yOptions += '<option val="' + this + '">' + this + '</option>';
  });
  
  
  $('#x').append(xOptions);
  $('#y').append(yOptions);
  
  var comparison = {
    
  }
  
  $('.generate-scatter').click(function(e){
    e.preventDefault();
    comparison.X = comparisonX.val();
    comparison.Y = comparisonY.val();
    store = storeSelect.val();
    segment = segmentSelect.val();  
       
    var url = '/scatter/' + comparison.X + '/' + comparison.Y + '/store/' + store + '/segment/' + segment;
    
    window.location.href = url;
    
  });
});