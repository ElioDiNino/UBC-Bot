module.exports = {
    name: 'purge',
    description: 'Delete past messages',
    args: true,
    guildOnly: true,
    aliases: ['prune', 'delete'],
    usage: '<# between 1 and 100>',
    permissions: 'MANAGE_MESSAGES',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        // Checks if a number is provided
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        // Makes sure the number isn't outside the allowed range
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }
        // Delete the specified number of messages
        const chan = message.channel;
        message.channel.bulkDelete(amount, true)
        .then((message) => {
            // Return a message
            chan.send(`${amount - 1} messages were deleted.`)
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        })
        // If an error occurs, report it
        .catch(err => {
            console.error(err);
            chan.send('There was an error trying to prune messages in this channel!')
            .then((msg) => {
                msg.delete({ timeout: 5000 });
            });
        });
    },
};