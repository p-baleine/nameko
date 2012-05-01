
/*
 * GET message lists.
 */

exports.list = function(req, res) {
	res.send(JSON.stringify([{name:'tajima'}, {name:'hoge'}, {name:'piyo'}]))
};
