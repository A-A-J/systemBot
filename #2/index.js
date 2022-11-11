// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs')
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for( folder of fs.readdirSync('./src/functions') ){
	for( file of fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith('js')) )
		require(`./functions/${folder}/${file}`)(client)
}

// Log in to Discord with your client's token
client.login(token);