util = require('util')
exec = require('child_process').exec


notify = (error, stdout, stderr, callback) ->
    util.log(error) if error
    util.log(stdout) if stdout
    util.log(stderr) if stderr
    callback() if callback and not error

    if error
        util.log('失敗しました')
    else
        util.log('成功しました')


task 'serve', 'ローカルにサーバを立ち上げる', (options) ->
    # クライアントビルド
    exec 'cd client; hem build', (error, stdout, stderr) ->
        notify(error, stdout, stderr, ->
            # サーバ起動
            exec 'cd api; node app.js', (error, stdout, stderr) ->
                notify(error, stdout, stderr)
        )
