function defineModels(mongoose, fn) {
	var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;
		 
	/**
	 * User model
	 * 
	 * Used for persisting users
	 */	
	function validatePresenceOf(value) {
		return value && value.length;
	}
	
	var Status = new Schema({
		user_name: {type: String, min: 1, max : 10}
		,content: String
		,insertTs: {type: Date, default: Date.now}
		,updateTs: {type: Date, default: Date.now}
	});
	
	Status.virtual('id')
		.get(function() {
			return this._id.toHexString();
	});
	
	// register mongoose models
	mongoose.model('Status', Status);
	fn();
}

exports.defineModels = defineModels;