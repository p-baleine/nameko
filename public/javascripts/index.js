jQuery(function() {

	jQuery('<button />', {
		text : 'list',
		click : list
	}).appendTo('body');

	function list() {
		jQuery.getJSON('/list', function(data) {
			jQuery(body).text(JSON.stringify(data));
		});
	}

});