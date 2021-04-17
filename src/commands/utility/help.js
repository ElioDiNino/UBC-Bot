const { prefix } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get help with the bot commands',
    args: false,
    guildOnly: false,
    aliases: ['commands', 'cmds'],
    usage: '[command name]',
    execute(message, args) {
          const data = [];
          const { commands } = message.client;

          // If no specific command is provided, list every command in an embed
          if (!args.length) {
            const title = 'Help';
            // Puts commands together and in one embed message
            data.push(
                'Here\'s a list of all my commands: '
                + '\`'
                + commands.map(command => command.name).join('\`, \`'), '\`');
            // Set the other embed details
            const footer = `You can send ${prefix}help [command name] to get info on a specific command!`;
                const helpEmbed = new Discord.MessageEmbed()
                .setColor('#002145')
                .setTitle(title)
                .setDescription(data)
                .setTimestamp()
                .setThumbnail("https://pbs.twimg.com/profile_images/1340085317794111488/Lrk-kBuQ_400x400.png")
                .setFooter(footer);

            // Aends the user a dm with info
            return message.author.send(helpEmbed)
               .then(() => {
                   if (message.channel.type === 'dm') return;
                   message.reply('I\'ve sent you a DM with all my commands!');
                })
                // Sends error message if unsuccessful
                .catch(error => {
            		console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
            		message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            	});
            }

        // Fetches command names and checks to see if exists
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        // Send error if doesn't exist
        if (!command) {
        	return message.reply('that\'s not a valid command!');
        }

        // Otherwise sends info about the command
        data.push(`**Name:** \`${command.name}\``);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};