// Require the dotenv, filesystem, and discord.js modules as well as some files
require('dotenv').config();
const fs = require('fs');
const { prefix } = require('./config.json');
const Discord = require('discord.js');
const { parse } = require("twemoji-parser");

// Create a new Discord client
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

//Loads in commands and checks if anything is missing
const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// For listing and removing slash commands (DO NOT DELETE)
/*
client.on('ready', async () => {
	const guildID = '831210032895885343'

	// List local slash commands
	const commands = await client.api
    	.applications(client.user.id)
    	.guilds(guildID)
    	.commands.get();
    console.log('Local:', commands);

	// List global slash commands
    const commands2 = await client.api
    	.applications(client.user.id)
    	.commands.get();
    console.log('Global:', commands2);

	// Delete the specified slash command
    //await client.api.applications(client.user.id).guilds(guildID).commands('id from console').delete();
}) */

// Find the event listener files
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

// Load those files is and execute them
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login to Discord with the bot's token
client.login(process.env.UBCENG_BOT_TOKEN);