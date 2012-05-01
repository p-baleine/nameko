Spine = require('spine')

class Status extends Spine.Model
    @configure(
      'Status',
      'user',
      'content',
      'insert_ts',
      'update_ts'
    )

    #@extend Spine.Model.Local
    @extend Spine.Model.Ajax
    @url: '/statuses'

module.exports = Status