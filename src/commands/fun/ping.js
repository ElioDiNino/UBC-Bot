module.exports = {
	name: 'ping',
	description: 'Check to see if the bot is alive',
	args: false,
	guildOnly: false,
	execute(message, args) {
		// Send a message then edit it with the ping time
		message.channel.send('Pinging...').then(sent => {
			sent.edit(`Pong! \`${sent.createdTimestamp - message.createdTimestamp}ms\``);
		});
	},
};