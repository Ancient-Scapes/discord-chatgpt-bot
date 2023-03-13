/* eslint-disable-next-line */
require("dotenv").config();

import {Client, ClientOptions, Events, GatewayIntentBits} from "discord.js";
import {chatCompletion} from "./chatgpt";

const options :ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
};
const client = new Client(options);

client.on(Events.MessageCreate, async (message) => {
  // チャンネルに特定の単語が含まれている場合にBotが返信する
  if (message.content.indexOf("おば、") === -1) return;

  try {
    // 質問に不必要な単語を切り取ってAPI実行
    const str = message.content.substring(2, message.content.length);
    const text = await chatCompletion(str);
    if (!text) throw Error(text);

    await message.channel.send(text);
  } catch (error) {
    console.log(error);
  }
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.BOT_TOKEN);

