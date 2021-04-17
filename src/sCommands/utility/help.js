const { prefix } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get help with the bot commands',
    slash: true,
    testOnly: false,
    callback: ({args}) => {
        // Returns an embed
        const title = 'Help';
        const data = `Type \`${prefix}help\` to see the list of every command or \`${prefix}help <command>\` to get info on a specific command!`;
            const helpEmbed = new Discord.MessageEmbed()
            .setColor('#002145')
            .setTitle(title)
            .setDescription(data)
        return helpEmbed;
    },
};