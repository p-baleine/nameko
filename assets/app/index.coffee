require('lib/setup')

Spine = require('spine')
PostApp = require('controllers/posts')

class App extends Spine.Controller
  constructor: (params) ->
    super
    post = new PostApp(el: $("#posts"))

module.exports = App
