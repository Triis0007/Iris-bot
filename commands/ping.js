const Discord = require('discord.js');

module.exports = {
	name: 'ping'// Certifique-se sempre desse ser o mesmo nome do arquivo
  aliases: []
};

module.exports.run = async (client, message, args) => {
var ping = Date.now() - message.createdTimestamp + " ms";
  var apiping = Math.round(client.ws.ping) + " ms";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EMBED E ENVIO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let bicon = client.user.displayAvatarURL();
let bname = client.user.username
let sem = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTimestamp(message.createdAt)
.setThumbnail(bicon)
.addField("Ping:", `\`🎯 ${ping}\``, false)
.addField("API:", `\`🚀 ${apiping}\``, false)
.setFooter(bname, bicon);
message.channel.send(sem); return
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EMBED E ENVIO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
