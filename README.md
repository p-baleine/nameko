README
======

## 1) インストール

### 1.1) Express
    $ sudo npm install -g express

### 1.2) Mongo

#### 1.2.1) Macの場合
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
