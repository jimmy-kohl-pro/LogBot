const Discord = require('discord.js');
const config = require("./config.json");
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();

client.on('ready', async () => {
  console.log(`Connecté en tant que ${client.user.tag}!`);
  client.user.setActivity("!log pour sauvegarder les logs.");
});

const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of command_files) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('message', async message => {
  if (message.content.startsWith(`${config.prefix}`)) {
    my_regexp = /[^\s"]+|"([^"]*)"/gi;
    const args = message.content.slice(config.prefix.length).trim().match(/[^\s"]+|"([^"]*)"/gi);
    for (let i = 0; i < args.length; i++) {
      if (args[i].charAt(0) === '"' && args[i].charAt(args[i].length -1) === '"') {
        args[i] = args[i].substr(1,args[i].length -2);
      }
    }
    const cmd = args.shift().toLowerCase();

    if (!client.commands.has(cmd)) {
      message.channel.send("Command not found.");
      return;
    }
    try {
      client.commands.get(cmd).run(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply('an error occure while execute this command.');
    }
  }
});

client.login(config.token);
