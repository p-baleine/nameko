jQuery(function() {

	jQuery('<button />', {
		text : 'list',
		click : list
	}).appendTo('body');

	function list() {
		jQuery.getJSON('/list', function(data) {
			jQuery.each(data, function() {
				jQuery('<div />', { text : this.name })
					.appendTo('body');
			});
		});
	}

});