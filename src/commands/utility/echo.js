module.exports = {
    name: 'echo',
    description: 'Send a message from the bot to any channel',
    aliases: ['message'],
    args: true,
    cooldown: 10,
    usage: '<channel> <message>',
    guildOnly: false,
    permissions: 'MANAGE_MESSAGES',
    execute(message, args) {
        // Splice the message to get the channel id
        // Remove the first 2 and last characters if it is a tagged channel (#channel name)
        if (args[0].startsWith('<#')) {
            var channel = args[0].substring(2, args[0].length-1);
        // Otherwise, assume the id was provided as a 20 digit number
        } else {
            var channel = args[0];
        }
        // Delete the evocation message
        //message.delete();

        // Checks to see if channel is within access
        if(message.guild.channels.cache.get(channel) !== undefined)  {
            // Remove the first argument (the channel name)
            args.shift();
                let location = message.client.channels.cache.get(channel).send(args.join(' '))
                    .then(() => {
                        message.channel.send('Success!');
                    })
                    .catch(error => {
              		    message.reply('there was an error sending the message, do you and I have permission to post there?');
                    });
        } else {
            // If it isn't, return an error
            message.reply('I couldn\'t find that channel. Are you sure you entered it correctly?');
        }
    },
};