"use strict"

// Edit by Pankov A
$(document).ready(function() {
	$.material.init();


	var resultElement = document.getElementById('result'),
	htmlSlider = document.getElementsByClassName('slider')[0],
	cssSlider = document.getElementsByClassName('slider')[1],
	selectHtml = document.getElementById('form-referee-select-html'),
	selectCss = document.getElementById('form-referee-select-css');

	
	noUiSlider.create(htmlSlider, {
		start: 5,
		connect: "lower",
		orientation: "horizontal",
		range: {
			'min': 0,
			'max': 10
		}
	});

	noUiSlider.create(cssSlider, {
		start: 5,
		connect: "lower",
		orientation: "horizontal",
		range: {
			'min': 0,
			'max': 10
		}
	});

	
	
// Append the option elements
	for ( var i = 0; i <= 10; i += 1 ){

	var option = document.createElement("option");
		option.text = i;
		option.value = i;

	selectHtml.appendChild(option);
	
}
for ( var i = 0; i <= 10; i += 1 ){

	var option = document.createElement("option");
		option.text = i;
		option.value = i;

	
	selectCss.appendChild(option);
}



	htmlSlider.noUiSlider.on('update', function( values, handle ) {

	var value = values[handle];
	selectHtml.value = Math.round(value);	
});

	selectHtml.addEventListener('change', function(){
	htmlSlider.noUiSlider.set([this.value, null]);
});
	cssSlider.noUiSlider.on('update', function( values, handle ) {

	var value = values[handle];
	selectCss.value = Math.round(value);	
});

	selectCss.addEventListener('change', function(){
	cssSlider.noUiSlider.set([this.value, null]);
});



})
