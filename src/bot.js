require("dotenv").config();
const { token } = process.env;
const {
  Client,
  Collection,
  GatewayIntentBits,
} = require("discord.js");
const fs = require("fs");

const { Guilds, GuildMessages, MessageContent, DirectMessages  } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages, MessageContent, DirectMessages ] });
client.commands = new Collection();
client.commandArray = [];
client.colour = "7F98E6";

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
//client.handleComponents();
client.login(token);
