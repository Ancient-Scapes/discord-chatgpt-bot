# discord-chatgpt-bot

Discord Botを通してChatGPT APIを実行し、チャンネルに投稿します。
`npm run dev` をローカルで実行中にBotが反応します。

## 認証情報について

`auth.json` ファイルに、Discord Bot の情報を記述します。

```json
{
  "tokens": [
    {
      "discordToken": "YOUR_DISCORD_BOT_TOKEN_1_HERE",
      "name": "YOUR_NAME_1_HERE",
      "promptStart": "YOUR_PROMPT_START_TOKEN_1_HERE",
      "promptEnd": "YOUR_PROMPT_END_TOKEN_1_HERE",
      "errorMessage": "YOUR_ERROR_MESSAGE_1_HERE"
    }
  ]
}
```

- *discordToken : Discord Bot のトークンを指定します。
- *name : 設定されているBot名を入力します。(@形式でmentionするときに表示される名前)
- promptStart : プロンプトの先頭に加える文字列を指定します。
- promptEnd : プロンプトの末尾に加える文字列を指定します。
- errorMessage : 入力値が不正であった場合に表示する共通エラーメッセージを指定します。

複数の認証情報Objectを記載することで、Botを複数実行することも可能です。

## OpenAI APIKeyの入力

.envファイルを作成し、API_KEYを入力してください。

```env
API_KEY=your_api_key_here
```

## Usage

```zsh
npm i
npm run dev
```

![image](https://user-images.githubusercontent.com/18649842/224736640-b6541a04-a1f4-4c4a-811a-620e44028868.png)
