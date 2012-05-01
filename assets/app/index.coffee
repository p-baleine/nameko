require('lib/setup')

Spine = require('spine')
StatusApp = require('controllers/statuses')

class App extends Spine.Controller
  constructor: (params) ->
    super
    post = new StatusApp(el: $("#statuses"))

module.exports = App
