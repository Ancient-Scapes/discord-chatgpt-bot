import {Client} from "discord.js";

export type AuthToken = {
  discordToken: string;
  name: string;
  promptStart: string;
  promptEnd: string;
  errorMessage: string;
};

export type Bot = {
  token: string;
  client: Client;
};
