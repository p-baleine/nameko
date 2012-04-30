Spine = require('spine')
Post = require('models/post')
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
        'input[name=user_name]': 'userName'
        'textarea': 'content'

    constructor: ->
        super
        Post.bind('create', @addOne)
        Post.bind('refresh', @addAll)

    addOne: (post) =>
        view = new Posts(item: post)
        @items.append(view.render())

    addAll: =>
        Post.each(@addOne)

    create: (e) ->
        e.preventDefault()
        Post.create(user_name: @userName.val(), content: @content.val())

module.exports = PostApp