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
  if (message.mentions.users.first()?.username !== process.env.BOT_USER_NAME2) return;

  try {
    message.channel.sendTyping();
    const text = await chatCompletion(requestStr(message.content));
    if (!text) throw Error(text);

    const textArray = text.split("\n");
    let sendText = textArray[textArray.length - 1];

    if (sendText.indexOf("：") !== -1) {
      sendText = requestStr(sendText, "：");
      sendText = sendText.replace("：", "");
    }

    if (sendText.indexOf("「") === 1) {
      sendText = sendText.replace(/[\u300c\u300d]/g, "");
    }

    await message.channel.send(sendText);
  } catch (error) {
    console.log(error);
  }
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.BOT_TOKEN2);

// mention部分のtextを削除し、本文のみでAPIにリクエストする
const requestStr = (str: string, startStr = ">") => str.substring(str.indexOf(startStr), str.length);
