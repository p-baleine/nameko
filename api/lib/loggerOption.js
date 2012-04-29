var mongoose = require('mongoose'),
    conn = mongoose.createConnection('mongodb://localhost/nameko');

var AccessLog = new mongoose.Schema({
    remoteAddr: String
    ,date: Date
    ,method: String
    ,status: String
	,referrer: String
	,ua: String
});

var pattern = /(\S+)\s-\s-\s\[([^\]]+)\]\s"([^"]+)"\s(\S+)\s(\S+)\s"([^"]+)"\s"([^"]+)"/;

exports.getOption = function() {
	var stream = {
		write: function(str) {
			var model = conn.model('access', AccessLog),
				matches = str.match(pattern),
				log = new model();

			log.remoteAddr = matches[1];
			log.date = matches[2];
			log.method = matches[3];
			log.status = matches[4];
			log.referrer = matches[5];
			log.ua = matches[6];

			log.save();
		}
	};
	return { stream: stream };
};