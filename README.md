# Team Blog Hub

![Demo](https://user-images.githubusercontent.com/34590683/96832331-8c289400-1479-11eb-9466-f24d30860a24.png)

企業/チームのためのブログ・スターターです。Forkしてご自由にお使いください。

ブログのRSSのURLを登録することで、チームメンバーの投稿を一覧にまとめて表示します。Zenn、Qiita、Medium、note、はてなブログなど、RSSフィードを取得できるサイトであれば、メンバーは好きな場所に投稿できます。

詳しくは下記の記事をご覧ください。

[チーム個々人のテックブログをRSSで集約するサイトを作った →](https://zenn.dev/catnose99/articles/cb72a73368a547756862)

## Demo
https://team-blog-hub.vercel.app

## Development
```bash
$ yarn install
$ yarn build
$ yarn dev
```

- サイトの基本設定は`site.config.ts`で行います。
- メンバーのプロフィールやRSSの登録は`members.ts`で行います。
- 配色を変更するには`src/styles/variables.scss`を書き換えます。
- ロゴなどの画像を変更するには`public`内のファイルを置き換えます。

その他、ご自由にコードを書き換えてください。

## Deployment
VercelやNetlifyにデプロイすることを推奨します。`npm run build`（or `yarn build`）を実行することで、RSSからの投稿データの取得とサイトのビルドが行われます。1日に1回などの頻度で自動デプロイするのが良いかもしれません。

### Static Web Apps のアクセス制限

`staticwebapp.config.json` の `networking.allowedIpRanges` で許可する接続元を管理します。IP アドレスを変更する際は、この一覧も更新してください。

| 用途 | 許可する IP アドレス |
| --- | --- |
| WAF | `57.180.88.54/32`, `54.248.212.94/32`, `18.180.18.135/32`, `54.249.124.186/32`, `13.113.3.69/32`, `35.75.196.77/32`, `52.193.180.251/32` |
| NS VPN | `20.46.177.167/32` |

## Licence
MIT
