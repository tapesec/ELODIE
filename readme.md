Instructions
=======================
Pour installer phantomjs sur heroku

Example usage:

```shell
$ heroku create --stack cedar --buildpack https://github.com/stomita/heroku-buildpack-phantomjs.git

# or if your app is already created:
$ heroku buildpacks:add https://github.com/stomita/heroku-buildpack-phantomjs --app elodidel

$ git push heroku master
```

si vous passez par github alors redeployez via le dashboard

