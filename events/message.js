const Discord = require('discord.js')
const config = require("../utils/client_configs.json");

let cooldown = new Set();

module.exports = async (client, message) => {
if (message.channel.type === "dm") {return}
if (message.author.bot) {return}
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
if (!command) {return}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMANDOS E ALIASES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let comando;
if(client.commands.has(command)) {
if(cooldown.has(message.author.id)) {return}

  comando = client.commands.get(command)
  let commandFile = require(`../commands/${comando.name}.js`);
  commandFile.run(client, message, args)
  setTimeout(() => {
   cooldown.delete(message.author.id)
}, 5 * 1000)
  cooldown.add(message.author.id)
}
if(client.commands.get(client.aliases.get(command))) {
if(cooldown.has(message.author.id)) {return}
comando = client.commands.get(client.aliases.get(command))
  let commandFile = require(`../commands/${comando.name}.js`);
  commandFile.run(client, message, args)
  setTimeout(() => {
   cooldown.delete(message.author.id)
}, 5 * 1000)
  cooldown.add(message.author.id)
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMANDOS E ALIASES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
