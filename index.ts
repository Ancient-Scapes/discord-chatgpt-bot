/* eslint-disable-next-line */
require("dotenv").config();

import { DateTime } from 'luxon';
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
    const startTime = DateTime.now();
    message.channel.sendTyping();

    const text = await chatCompletion(requestStr(message.content));
    if (!text) throw Error(text);

    logProcessTime(startTime);
    await message.channel.send(text);
  } catch (error: any) {
    message.channel.send(process.env.ERROR_MESSAGE ?? "");

    if (error instanceof TypeError) {
      message.channel.send("TypeErrorやで、なんかAPIがおかしいわ");
    } else if (error.name === "AbortError") {
      message.channel.send("AbortErrorやで、20秒以上たったかAPIサーバがおかしいわ");
    } else {
      message.channel.send("しらんErrorやで");
    }
    message.channel.send(JSON.stringify(error));
    console.log(error);
  }
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.BOT_TOKEN);

// mention部分のtextを削除し、本文のみでAPIにリクエストする
const requestStr = (str: string) => str.substring(str.indexOf(">"), str.length);

// 処理時間出力
const logProcessTime = (startTime: DateTime) => {
  const endTime = DateTime.now();
  const formattedDiff = endTime.diff(startTime, "milliseconds").as("seconds").toFixed(2);
  const formattedTime = endTime.toFormat("MM/dd HH:mm:ss");

  // 処理時間を出力する
  console.log(`[${formattedTime}] 処理時間: ${formattedDiff}秒`);
};
