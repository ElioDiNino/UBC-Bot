const Discord = require('discord.js');

module.exports = {
	name: 'reactionrole',
	description: 'React to get a role!',
	args: false,
	aliases: ['rr', 'reactions'],
	async execute(message, args) {
        const channel = message.channel;
        const appleRole = message.guild.roles.cache.find(role => role.name === "apple");
        const bananaRole = message.guild.roles.cache.find(role => role.name === "banana")

	    //Insert Reaction Emojis Here
		const appleEmoji = '🍎';
	    const bananaEmoji = '🍌';

	    //Creates Embed Message
	    const embed = new Discord.MessageEmbed()
			.setColor('#e42643')
			.setTitle('Reaction Roles')
			.setDescription('React correspondingly to get a role!\n\n'
				+ `${appleEmoji} for apple\n`
				+ `${bananaEmoji} for banana`);

	    let messageEmbed = await message.channel.send(embed);
	    messageEmbed.react(appleEmoji);
	    messageEmbed.react(bananaEmoji)

		//gives user role based on reaction
	    message.client.on('messageReactionAdd', async (reaction,user) => {
	    	if (reaction.message.partial) await reaction.message.fetch();
	    	if (reaction.partial) await reaction.fetch();
	    	if (user.bot) return;
	    	if (!reaction.message.guild) return;

			//checks for emoji type and adds role
	    	if (reaction.message.channel.id == channel && reaction.emoji.name === appleEmoji) {
	    		await reaction.message.guild.members.cache.get(user.id).roles.add(appleRole);
	    	}
	    	if (reaction.message.channel.id == channel && reaction.emoji.name === bananaEmoji) {
	    		await reaction.message.guild.members.cache.get(user.id).roles.add(bananaRole);
	    	} else {
	    		return;
	    	}
	    });

	    //removes role based on user removal of reaction
	    message.client.on('messageReactionRemove', async (reaction,user) => {
	    	if (reaction.message.partial) await reaction.message.fetch();
	    	if (reaction.partial) await reaction.fetch();
	    	if (user.bot) return;
	    	if (!reaction.message.guild) return;

			//checks for emoji type and removes role
	    	if (reaction.message.channel.id == channel && reaction.emoji.name === appleEmoji) {
	    		await reaction.message.guild.members.cache.get(user.id).roles.remove(appleRole);
	    	}
	    	if (reaction.message.channel.id == channel && reaction.emoji.name === bananaEmoji) {
	    		await reaction.message.guild.members.cache.get(user.id).roles.remove(bananaRole);
	    	} else {
	    		return;
	    	}
	    });
	}
}
