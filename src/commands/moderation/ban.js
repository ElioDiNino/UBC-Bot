const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban the specified member from the server',
    args: true,
    cooldown: 10,
    usage: '<user> [reason]',
    guildOnly: true,
    permissions: 'BAN_MEMBERS',
    async execute(message, args) {
        message.delete();
        // Returns the user object if a user mention exists
        var user = message.mentions.users.first();
        // Reason of the ban (everything behind the mention)
        const banReason = args.slice(1).join(' ');
        var details = args[0];

        // Check if the user mention or the entered id is the message author themself
        if (user === message.author) return message.channel.send('You can\'t ban yourself');
        // Check if a reason has been given by the message author
        if (!banReason) return message.reply('You forgot to enter a reason for this ban!');

        // Check if a user mention exists in this message
        if (!user) {
            try {
                await message.guild.members.ban(args[0]);
                user = 'User';

            } catch (error) {
                return message.reply('I couldn\'t find a user with that id!');
            }
        } else {
            await message.guild.members.ban(user); // Bans the user
            user = user.tag
            details = `${user.username}#${user.discriminator} (${user.id})`;
        }

        const banConfirmationEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`✅ ${user} has been successfully banned!`);
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
                .setDescription(`**Action**: Ban
                **User**: ${details}
                **Reason**: ${banReason}`);
            // Sends the embed in the modlogchannel
            message.client.channels.cache.get(modlogChannelID).send(banConfirmationEmbedModlog);
        }
    },
};