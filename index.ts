import {Client, ClientOptions, Events, GatewayIntentBits} from "discord.js";
require('dotenv').config();

const options :ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
};
const client = new Client(options);

client.on(Events.MessageCreate, message => {
  if (message.content.indexOf('こんにちは') !== -1) {
    message.channel.send('よお');
  }
});

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.BOT_TOKEN);

