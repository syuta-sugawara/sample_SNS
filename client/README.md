# client

## how to use 

- Node.jsとnpmを準備する
- `.env`ファイルを作成して以下を記述
  - `API_URL_DEV=http://localhost:1323`
  - `API_URL_PROD=https://ztgvzmy5r1.execute-api.ap-northeast-1.amazonaws.com/dev`
- 依存パッケージをインストールする
  - `$ npm install`
- 開発用サーバを起動する
  - `$ npm run dev`

### Linter

- commit時に`$ npm run lint`を実行し、ESLintとStyleLintのテストが走ります。
- コードに問題があると、commitに失敗しエラーログが出力されます。
- コードの修正はエラーログを確認しながら自ら修正するか、`$ npm run fix`コマンドを実行してください。

### Storybook

- StorybookはUIコンポーネント開発環境です。
- コンポーネントを一望できるスタイルガイドのように使ったり、コンポーネントがどのような挙動をするのかテストできたりします。
- `src/stories`内でStoryを書き、`$ npm run storybook`を実行すると確認することができます。
