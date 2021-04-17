const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	usage: '<command>',
	aliases: ['refresh', 'sync',' update', 'rl'],
	execute(message, args) {
		// Fetches user input for command name
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		// Send error message if no such name
		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		// Directories and searching for file
		const commandFolders = fs.readdirSync('./src/commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./src/commands/${folder}`).includes(`${commandName}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		// Gets the new file and sets that as current cmd file
		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
		// Sends error if unsuccessful
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};