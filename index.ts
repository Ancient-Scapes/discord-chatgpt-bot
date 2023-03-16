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
  if (message.mentions.users.first()?.username !== process.env.BOT_USER_NAME) return;

  try {
    message.channel.sendTyping();
    const startTime = new Date().getTime();

    const text = await chatCompletion(requestStr(message.content));
    if (!text) throw Error(text);
    console.log(`処理時間: ${new Date().getTime() - startTime}ms`);

    await message.channel.send(text);
  } catch (error) {
    if (error instanceof TypeError) {
      message.channel.send(process.env.ERROR_MESSAGE ?? "");
      message.channel.send(typeof Error);
      message.channel.send(error.message);
    } else {
      message.channel.send(process.env.ERROR_MESSAGE ?? "");
      message.channel.send(typeof error);
    }
    console.log(error);
  }
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.BOT_TOKEN);

// mention部分のtextを削除し、本文のみでAPIにリクエストする
const requestStr = (str: string) => str.substring(str.indexOf(">"), str.length);

