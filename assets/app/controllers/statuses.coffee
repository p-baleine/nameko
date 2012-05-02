Spine = require('spine')
Status = require('models/status')
$ = Spine.$

class Statuses extends Spine.Controller
    events:
        'mouseover .status': 'toggleActions'

    elements:
        '.actions': 'actions'

    constructor: ->
        super

    render: =>
        @html require('views/status')(@)

    toggleActions: ->
        @actions.toggle('fast')

    helper:
        isMyStatus: (item) ->
            require('index').user is item.user?._id

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