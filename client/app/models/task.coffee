module.exports = class Task extends Spine.Model
  @configure "Task", "name", "done"

  # Persist with Local Storage
  @extend Spine.Model.Local

  @active: ->
    @select (item) -> !item.done

  @done: ->
    @select (item) -> !!item.done

  @destroyDone: ->
    rec.destroy() for rec in @done()
