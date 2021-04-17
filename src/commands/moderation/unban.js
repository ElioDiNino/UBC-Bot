const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unbans the specified member from the server',
    args: true,
    cooldown: 10,
    usage: '<user> [reason]',
    guildOnly: true,
    permissions: 'BAN_MEMBERS',
    async execute(message, args) {
        message.delete();
        // Reason of the ban (everything behind the mention)
        const banReason = args.slice(1).join(' ');

        try {
            await message.guild.members.unban(args[0]);
        } catch (error) {
            return message.reply('I couldn\'t find a user with that id!');
        }

        const banConfirmationEmbed = new Discord.MessageEmbed()
            .setColor('#76B154')
            .setDescription(`✅ User has been successfully unbanned!`);
        // Sends a confirmation embed that the user has been successfully banned
        message.channel.send(banConfirmationEmbed);

        // Discord channel ID where you want to have logged the details about the ban
        const modlogChannelID = '831210033345331221';
        if (modlogChannelID.length !== 0) {
            // Check if the modlogChannelID is a real Discord server channel that really exists
            if (!message.client.channels.cache.get(modlogChannelID)) return undefined;

            const banConfirmationEmbedModlog = new Discord.MessageEmbed()
                .setAuthor(`Banned by ${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL)
                .setColor('RED')
                .setTimestamp()
                .setDescription(`**Action**: Unban
                **User**: ${args[0]}
                **Reason**: ${banReason}`);
            // Sends the embed in the modlogchannel
            message.client.channels.cache.get(modlogChannelID).send(banConfirmationEmbedModlog);
        }
    },
};