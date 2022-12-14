# react-nginx-go-mysql-todo

## docker

VSCodeのRemote Contetainerを使用する場合は、VSCodeから起動させること！

初期化 ネットワークを作る
```
docker network create front_bridge
docker network create back_bridge
```

### 開発環境

ビルド
```
docker-compose --env-file ./.env build
```

起動

```
docker-compose --env-file ./.env up -d
```

停止

```
docker-compose stop
```

### 本番環境

ビルド
```
docker-compose --env-file ./.env.production build
```

起動

```
docker-compose --env-file ./.env.production up -d
```

停止

```
docker-compose stop
```

## 参考サイト
How To Deploy a Go Web Application with Docker
https://semaphoreci.com/community/tutorials/how-to-deploy-a-go-web-application-with-docker

jwilder/nginx-proxyで{ホスト名}/{パス}でコンテナにルーティングする方法
https://qiita.com/Ayumu_Usu/items/0891f3f733e355ed1265

月 5.5ドルで使える Vultr で nginx-proxy を構築して frourio を Docker で動かす！
https://zenn.dev/su8ru/articles/vultr-nginx-proxy-frourio

カスタム トークンを作成する Firebase
https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=ja&authuser=0

gin カスタムミドルウェア
https://github.com/gin-gonic/gin#using-middleware

ID トークンを検証する Firebase
https://firebase.google.com/docs/auth/admin/verify-id-tokens?authuser=1&hl=ja#go

「Vue.js + Go言語 + Firebase 」で始める! Frontend & Backend API 両方で認証するセキュアなSPA開発ハンズオン!
https://qiita.com/po3rin/items/d3e016d01162e9d9de80

Next.js: Firebase Authentication and Middleware for API Routes
https://dev.to/dingran/next-js-firebase-authentication-and-middleware-for-api-routes-29m1

Create Protected Routes In NextJS and NextAuth
https://cloudcoders.xyz/blog/create-protected-routes-in-nextjs/

バックエンドの Go アプリで Firebase Authentication のユーザを特定する
https://zenn.dev/minguu42/articles/20220501-go-firebase-auth

Go言語で基本的なCRUD操作を行うREST APIを作成
https://dev.classmethod.jp/articles/go-sample-rest-api/

VSCode Connect to multiple containers
https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers

dotfiles
https://dotfiles.github.io/

golang+react なアプリの開発環境をモノレポで作る
https://zenn.dev/karabiner/articles/golang_react_monorepo

とりあえず golang+nginx+mysql+docker-compose の環境構築
https://qiita.com/greenteabiscuit/items/ef4ed1dfda0d396d9d0f

GORM+Gin で Todo リストの API を作ってみた
https://taisablog.com/archives/gorm-gin-todo-api