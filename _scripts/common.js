$(document).ready(function() {
	$('.maps').click(function(){
	$(this).find('iframe').addClass('clicked')
	}).mouseleave(function(){
		$(this).find('iframe').removeClass('clicked');
	});

	$('.hasMenu').click(function(e) {
		event.preventDefault();
		$('.subMenu').toggle();
	});

	$('.header-lowResMenu').click(function() {
		$('.lowResMenu').toggle();
	});
	$('.formButton').click(function() {
		$('#form').removeClass('hidden');
	});
	$('.close').click(function() {
		$('#form').addClass('hidden');
	});
	$('form').submit(function() {
		event.preventDefault();
		alert("ajax_request");
	});
	$('.hasLowResSubMenu a').click(function(e) {
		e.preventDefault();
		$('.lowResSubMenu').toggle();
	});
});
