module.exports = {
    name: 'kick',
    description: 'Kick the specified member from the server',
    args: true,
    cooldown: 10,
    usage: '<user>',
    guildOnly: true,
    permissions: 'KICK_MEMBERS',
    execute(message, args) {
        // Check to see if the member exists
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {
                // If they do, kick them and send a message
                member
                .kick()
                .then((member) => {
                    message.channel.send(`${member} was kicked`);
                    message.delete();
                })
                // Send an error is they aren't kicked
                .catch((err) => message.channel.send('I cannot kick that user'));
            } else {
                // Send an error is the user isn't found
                message.channel.send('That member was not found');
            }
        }
    },
};