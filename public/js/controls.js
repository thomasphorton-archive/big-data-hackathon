$(function() {
  $( "#slider-opacity" ).slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 100,
    value: 90,
    slide: function (event, ui) {
      $("#display-opacity").text(ui.value / 100);
    },
    stop: function( event, ui) {
      newOpacity = ui.value / 100;
      heatmap.setOptions({opacity: newOpacity});
    }
  });
  
  $( "#slider-maxIntensity" ).slider({
    orientation: "vertical",
    range: "min",
    min: 1,
    max: 500,
    value: 100,
    slide: function (event, ui) {
      $("#display-maxIntensity").text(ui.value);
    },
    stop: function( event, ui) {
      newVal = ui.value;
      heatmap.setOptions({maxIntensity: newVal});
    }
  });
  
  $( "#slider-radius" ).slider({
    orientation: "vertical",
    range: "min",
    min: 1,
    max: 20,
    value: 10,
    slide: function (event, ui) {
      $("#display-radius").text(ui.value);
    },
    stop: function( event, ui) {
      newVal = ui.value;
      heatmap.setOptions({radius: newVal});
    }
  });
});