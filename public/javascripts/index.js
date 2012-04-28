jQuery(function() {

	jQuery.getJSON('/list', function(data) {
		jQuery(body).text(JSON.stringify(data));
	});

});