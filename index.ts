/* eslint-disable-next-line */
require("dotenv").config();
import {Client, ClientOptions, Events, GatewayIntentBits, Message} from "discord.js";
import {readFile} from "fs/promises";

import {AuthToken, Bot} from "./types";
import {messageCreateHandler} from "./messageCreateHandler";

const options: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
};

const readAuthTokens = async (): Promise<AuthToken[]> => {
  const data = await readFile("./auth.json", "utf-8");
  return JSON.parse(data).tokens;
};

const initBots = async () => {
  const tokens: AuthToken[] = await readAuthTokens();
  const bots: Bot[] = tokens.map((token) => {
    return {
      token: token.discordToken,
      client: new Client(options),
    };
  });

  bots.forEach(async (bot, i) => {
    await bot.client.login(bot.token);
    console.log(`Logged in as ${bot.client.user?.tag}`);
    bot.client.on(Events.MessageCreate, (m: Message) => messageCreateHandler(m, tokens[i]));
  });
};

initBots().catch((error) => console.error(error));
