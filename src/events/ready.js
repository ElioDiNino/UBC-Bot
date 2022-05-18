const WOKCommands = require('wokcommands');
const path = require('path')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const guildID = '831210032895885343'

	    new WOKCommands(client, {
	        commandsDir: path.join(__dirname, '../sCommands'),
	        showWarns: false,
	        //testServers: [guildID],
	    })
	    // Send a success message to the console
		console.log(`${client.user.tag} has logged in.`);
		// Set the bot activity status
        client.user.setPresence({
            status: 'online',
            activity: {
                name: '?help',
                type: 'PLAYING',
            }
        });
	},
};