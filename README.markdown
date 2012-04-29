README
======

## 1) インストール
    $ cd <nameko>
    $ npm install

### 1.1) Mongo

#### 1.1.1) Macの場合
    $ sudo brew update
    $ sudo brew install mongodb
    $ sudo mkdir -p data/db
    $ sudo chown `id -u` /data/db
    $ sudo npm install mongodb

    # 試しにインサート
    $ mongo
    MongoDB shell version: 2.0.4
    connecting to: test
    > use nameko
    switched to db nameko
    > show collections
    > db.posts.insert({name: 'hoge'})
    > db.posts.findOne()
    { "_id" : ObjectId("4f9baa6c3b8af52f7fe015d3"), "name" : "hoge" }

### 1.2) 起動
    $ cake serve

## 2) 参考サイト

  * REST [https://github.com/visionmedia/express-resource]
  * Mongo [https://github.com/LearnBoost/mongoose]
  * test [http://firn.jp/2011/09/21/nodejs-tdd]
  * commonJS [http://mnmly.github.com/library/coffeescript/05\_applications.html]
