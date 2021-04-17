module.exports = {
	name: 'ping',
	description: 'Check to see if the bot is alive',
	slash: true,
	testOnly: false,
	callback: ({}) => {
		return 'Pong!';
	},
};