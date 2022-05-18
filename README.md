# Welcome to the UBC Discord Bot repository
This is an automation bot that helps Discord server owners organize and manage users. It has a variety of commands available and has been designed with future additions in mind. The prefix used in our example is `?` but can be customized to something different if desired.

### Code organization
You can find the main code in [/src](src), with [index.js](src/index.js) being the main file and event handlers stored in [/src/events](src/events). Lastly you will find code for each of the commands in [/src/commands](src/commands) and code for the slash commands in [/src/sCommands](src/sCommands).

### What we're proud of
Out of all the features, we are most proud of our `?help` command. Having struggled to get the bot to respond to the user in DMs for quite a while,
we figured out the bug and are satisfied with the functionality and its ability to dynamically update to any commands that we add.

### What is Discord and what is a Discord bot?

#### In Discord's words:
*“An all-in-one voice and text chat for gamers that's free, secure, and works on both your desktop and phone. Stop paying for TeamSpeak servers and hassling with Skype. Simplify your life.”*

#### Our short definition:
Discord is like a more advanced version of Microsoft Teams, with finer control in relation to moderation and permissions, and more organization for discussions and information.

#### Our detailed definition:
Discord is an all-in-one voice, video, and text platform home to an endless number of communities where users connect with others, have fun, and share information. Within Discord, users can access servers that they have been invited to (such as the link we've shared). Each of these servers are a separate community of members, with different rooms, referred to as channels, for organized discussion. You can drop your messages in a channel as you would in a normal chat service. In addition, there are voice channels where you can talk like you would on a normal phone conversation and/or listen to music using a Discord bot.

On that topic, you now may be wondering, what is a Discord bot? A Discord bot is an application that can be written by anyone for free that plugs directly into Discord's API so that users can interact with it in any of the servers they own/have administrative permissions in. Bots have the ability to do things that regular users can't do and provide added fun and features to servers that they are added to. The possibilities are endless with Discord bots, but here are some examples of the types of bots available:

- Chat Bot (a bot that chats & tries to behave like a human)
- Moderation Bot - by far the most popular type, especially in large servers (these bots will automatically moderate your server by warning, muting, kicking, or banning members automatically for breaking rules such as swearing, spamming messages, or sending unsolicited advertising).
- Music Bot (can play music in a voice channel from YouTube or anywhere else based on user requests)

Some common bot features include (beyond what is above):
- Viewing information about your Discord server or a specific user.
- Creating webhooks for your one or many GitHub Repositories or similar
- Implementing a levelling system based on the most active users
- Having the ability to send polls to a server
- Giving the ability for users to pick up roles based on their reaction to messages (like a Teams post reaction)

Overall, Discord bots are a great way to better manage servers as well as to make servers more fun for regular members.

#### Resources we found most helpful:
- https://discordjs.guide/
- https://discord.js.org/#/docs/main/stable/general/welcome

## Running the bot
1. Get your bot token from the Discord developer portal (https://discord.com/developers/applications)
2. Run `echo DISCORD_TOKEN=Your_Token > .env`
3. Run `npm install` to install dependencies
4. Run `node ./src/index.js` and the bot should start up