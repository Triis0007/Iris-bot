
const Discord = require("discord.js");
const myIntents = new Discord.Intents();
myIntents.add('GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES');
const client = new Discord.Client({
                                  ws: { intents: myIntents }
    
});

client.config = require('./utils/client_configs.json')

const fs = require("fs")

const config = require("./utils/client_configs.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err)
  let dotjs = files.filter(f => f.split(".").pop() === "js")
  if(dotjs.length <= 0) return console.log("KD OS COMANDO")
  
  dotjs.forEach((f, i) => {
    let props = require(`./commands/${f}`)
    console.log(`${i + 1}: ${f} carregado`)
client.commands.set(props.name, props)
    props.aliases.forEach(alias => {
      client.aliases.set(alias, props.name)
    })
  })
  console.log(`Calma ae patrão to carregando ${dotjs.length} comandos`)
})

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file, i) => {
    const event = require(`./events/${file}`);
    
    console.log(`${i + 1}: ${file} carregado`)
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.login(client.config.client_token)
