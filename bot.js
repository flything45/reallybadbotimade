const Discord = require('discord.js');
const client = new Discord.Client();
var commands = ["!argumentinfo","!nigga","!kick","!avatar","!prune","daily","!server","!userinfo","!help"];

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	if (!message.content.startsWith('!') || message.author.bot) return;
	const args = message.content.slice('!'.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'argumentinfo'){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === 'foo'){
			return message.channel.send('bar');
		}

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	else if (command === 'nigga'){
		if (!message.mentions.users.size){
			return message.reply('you need to tag a user to demonstrate your superiority to them.');
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`${taggedUser.username}, behold ${message.author.username}'s mighty power!`);
	}
	else if (command === 'userinfo'){
		if (!message.mentions.users.size){
			return message.channel.send('your username: ' + message.author.username + '\nyour ID: ' + message.author.id);
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(taggedUser.username + ' ID: ' + taggedUser.id);
	}
	else if (command === 'kick') {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}
	else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		});
		message.channel.send(avatarList);
	}
	else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		else if (amount <= 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	}

	if (message.content === '!daily'){
		message.channel.send('fuck off it aint ready yet');
	}
	else if (message.content === '!server'){
		message.channel.send('server name: ' + message.guild.name + '\ntotal members: ' + message.guild.memberCount +
		'\ndate created: ' + message.guild.createdAt + '\nregion: ' + message.guild.region);
	}
	else if (message.content === '!help'){
		message.reply("the list of my commands has been sent to your direct messages with me.");
		var i;
		for (i = 0; i < commands.length; i++){
			message.author.send(commands[i]);
		}
	}
});

client.login(process.env.BOT_TOKEN);
