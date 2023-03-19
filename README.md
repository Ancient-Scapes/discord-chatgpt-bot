# discord-chatgpt-bot

Discord Botを通してChatGPT APIを実行し、チャンネルに投稿します。
`npm run dev` をローカルで実行中にBotが反応します。

## Environments

以下が必要です。

- BOTユーザ名
- DiscordのBot Token
- OpenAIのAPI KEY

### Option

これらは入力されなくても動作します。

- SECRET_PROMPT_START
  - 入力プロンプトの最初に何らかのプロンプトを付与できます。
- SECRET_PROMPT_END
  - 入力プロンプトの最後に何らかのプロンプトを付与できます。
- ERROR_MESSAGE
  - エラー時の最初に出力される共通エラーメッセージです。

.env

```zsh
BOT_USER_NAME=BOTユーザ名
BOT_TOKEN=DiscordのBotToken
API_KEY=OpenAIのAPIKEY
SECRET_PROMPT_START=追加プロンプト(開始)
SECRET_PROMPT_END=追加プロンプト(終了)
ERROR_MESSAGE=共通エラーメッセージ
```

## Usage

```zsh
npm i
npm run dev
```

![image](https://user-images.githubusercontent.com/18649842/224736640-b6541a04-a1f4-4c4a-811a-620e44028868.png)
