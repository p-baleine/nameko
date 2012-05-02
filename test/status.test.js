/**
 * Module dependencies.
 */
var assert = require('assert');

module.exports = {
	'test status.create()': function(){
		
		var status = express.createServer();

		var ret = app.resource('forums', require('./fixtures/forum'));
		ret.should.be.an.instanceof(Resource);

		assert.response(app,
			{ url: '/forums' },
			{ body: 'forum index' });
	}
};
