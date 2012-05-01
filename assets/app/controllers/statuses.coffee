Spine = require('spine')
Status = require('models/status')
$ = Spine.$

class Statuses extends Spine.Controller
    constructor: ->
        super

    render: =>
        @html require('views/status')(@)

    helper:
        isMine: (item) ->
            console.log(require('index').user)
            console.log(item.user._id)
            require('index').user is item.user._id

class StatusApp extends Spine.Controller
    events:
        'submit form': 'create'

    elements:
        '#items': 'items'
        'textarea': 'content'

    constructor: ->
        super
        Status.bind('save', @addOne)
        Status.bind('refresh', @addAll)
        Status.fetch()

    addOne: (status) =>
        view = new Statuses(item: status)
        @items.append(view.render())

    addAll: =>
        Status.each(@addOne)

    create: (e) ->
        e.preventDefault()
        Status.create(content: @content.val())

module.exports = StatusApp