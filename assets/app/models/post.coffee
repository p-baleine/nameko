Spine = require('spine')

class Post extends Spine.Model
    @configure 'Post', 'user_name', 'content', 'insert_ts', 'update_ts'

    #@extend Spine.Model.Local
    @extend Spine.Model.Ajax

module.exports = Post