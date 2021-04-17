const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'message',
	execute(message) {
	    const client = message.client;

		// Exits if it is a bot message
        if (message.author.bot) return;

        // Create an array of the arguments and save the command
        const args = message.content.slice(prefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();

        // Hello test
		if (message.content.toLowerCase() === 'hello') {
            message.reply('hello there!');
            }
            // Checks for Ben test
            else if (message.content.toLowerCase() === 'ben') {
                message.channel.send('is awesome!');
            };

        // Exit if message doesn't start with the prefix
        if (!message.content.startsWith(prefix)) return;

        // Check if the command exists
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        // Check if the command can only be run in a server
        if (command.guildOnly && message.channel.type === 'dm') {
    	    return message.reply('I can\'t execute that command inside DMs!');
        }

        // Check if the user has the required permissions
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You do not have permissions to use that command!');
            }
        }

        // Set and track the command cooldown
        const { cooldowns } = client;

        if (!cooldowns.has(command.name)) {
        	cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
        	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        	if (now < expirationTime) {
        		const timeLeft = (expirationTime - now) / 1000;
        		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        		.then((message) => {
                message.delete({ timeout: timeLeft*1000 + 1000 });
                });
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // Check if the command was used incorrectly
        if (command.args && !args.length) {
            message.delete({ timeout: 5000 });
            let reply = `You didn't provide any arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply)
            .then((message) => {
                message.delete({ timeout: 5000 });
            });
    	}

        // Run the command
        try {
        	command.execute(message, args);
        } catch (error) {
        	console.error(error);
        	message.reply('there was an error trying to execute that command!')
        	.then((message) => {
                message.delete({ timeout: 10000 });
            });
        }
	},
};