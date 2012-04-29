jQuery ->

    $("<button />",
        text: "list"
        click: ->
            $.getJSON "/list", (data) ->
                $.each data, () ->
                    $("<div />", text: @name).appendTo "body"
    ).appendTo "body"
