require('lib/setup')

Spine = require('spine')

class App extends Spine.Controller
  constructor: ->
    console.log('hoge')
    super

module.exports = App
