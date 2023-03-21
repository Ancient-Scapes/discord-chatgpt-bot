import {DateTime} from "luxon";
import {Message} from "discord.js";
import {chatCompletion} from "./chatgpt";
import {AuthToken} from "./types";

export const messageCreateHandler = async (message: Message, bot: AuthToken) => {
  if (message.mentions.users.first()?.username !== bot.name) return;

  try {
    const startTime = DateTime.now();
    message.channel.sendTyping();

    const text = await chatCompletion(requestStr(message.content), bot);
    if (!text) throw Error(text);

    logProcessTime(startTime, bot.name);
    await message.channel.send(text);
  } catch (error: any) {
    message.channel.send(bot.errorMessage ?? "");

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
};

// mention部分のtextを削除し、本文のみでAPIにリクエストする
const requestStr = (str: string) => str.substring(str.indexOf(">") + 1, str.length);

// 処理時間出力
const logProcessTime = (startTime: DateTime, botName: string) => {
  const endTime = DateTime.now();
  const formattedDiff = endTime.diff(startTime, "milliseconds").as("seconds").toFixed(2);
  const formattedTime = endTime.toFormat("MM/dd HH:mm:ss");

  // 処理時間を出力する
  console.log(`[${botName} ${formattedTime}] 処理時間: ${formattedDiff}秒`);
};
