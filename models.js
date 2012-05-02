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
		//user_name: {type: String, min: 1, max : 10},
		user: { type: ObjectId, ref: 'User' },
		content: String,
		insertTs: {type: Date, default: Date.now},
		updateTs: {type: Date, default: Date.now}
	});

	Status.virtual('id')
		.get(function() {
			return this._id.toHexString();
	});

	Status.virtual('user_name')
		.get(function() {
			return User.findOne({ _id : this.user_id });
		});

	var UserSchema = new Schema({});
	UserSchema.plugin(mongooseAuth, {
		everymodule: {
			everyauth: {
				User: function () {
					return User;
				}
			}
		}
		, password: {
			loginWith: 'email'
			, extraParams: {
				name: String
			}
			, everyauth: {
				getLoginPath: '/login'
				, postLoginPath: '/login'
				, loginView: 'login.jade'
				, getRegisterPath: '/register'
				, postRegisterPath: '/register'
				, registerView: 'register.jade'
				, loginSuccessRedirect: '/'
				, registerSuccessRedirect: '/'
			}
		}
	});

	// register mongoose models
	mongoose.model('Status', Status);
	mongoose.model('User', UserSchema);
	fn();
}

exports.defineModels = defineModels;
