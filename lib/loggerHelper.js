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

var SystemLog = new mongoose.Schema({
	content: String
	,priority: Number
	,insertTs: Date
});

exports.severity = {
	DEBUG : 0
	,ERROR : 3
	,FATAL : 4
	,INFO : 1
	,UNKNOWN : 5
	,WARN : 2
};

/**
 * express.logger初期化時のパラメタを返却する
 * @return {Object} ログの出力先をMongoDBにするオプション
 */
exports.getOption = function() {
	var stream = {
			write : function(str) {
				var pattern = /(\S+)\s-\s-\s\[([^\]]+)\]\s"([^"]+)"\s(\S+)\s(\S+)\s"([^"]+)"\s"([^"]+)"/,
					model = conn.model('access', AccessLog),
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

/**
 * システムログを取る
 * @param {Object} content 内容
 * @param {Number} priority プライオリティ(デフォルトはINFO)
 * @param {Date} insertTs 日時(デフォルトは今)
 */
exports.syslog = function(content, priority, insertTs) {
	priority = priority || exports.severity.INFO;
	insertTs = insertTs || new Date();

	var model = conn.model('system', SystemLog),
		sys = new model();

	sys.content = content;
	sys.priority = priority;
	sys.insertTs = insertTs;

	console.log(content);
	sys.save();
};

