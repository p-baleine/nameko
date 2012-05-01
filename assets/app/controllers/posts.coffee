Spine = require('spine')
Post = require('models/post')
App = require('index')
$ = Spine.$

class Posts extends Spine.Controller
    constructor: ->
        super

    render: =>
        @html require('views/post')(@item)

class PostApp extends Spine.Controller
    events:
        'submit form': 'create'

    elements:
        '#items': 'items'
        'textarea': 'content'

    constructor: ->
        super
        Post.bind('create', @addOne)
        Post.bind('refresh', @addAll)
        Post.fetch()

    addOne: (post) =>
        view = new Posts(item: post)
        @items.append(view.render())

    addAll: =>
        Post.each(@addOne)

    create: (e) ->
        e.preventDefault()
        Post.create(user_name: App.user_id, content: @content.val())

module.exports = PostApp