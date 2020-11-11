const fs = require("fs")
const bdir = process.cwd() + "/assets/banners.json"
const Discord = require("discord.js")

module.exports.set = async (client, channel) => { 
    var social = client.guilds.cache.get("669603678579064842")

    var banners = JSON.parse(fs.readFileSync(bdir, "utf8"))
       
    if(!banners) fs.writeFile(bdir, JSON.stringify("[]"), (err) => { if (err) console.log(err) })
        
    if(typeof banners !== "array") throw new Error("Banners must be a array")
    if(banners.length === 0) banners = [{url: "https://cdn.discordapp.com/banners/669603678579064842/c854a7c52f0609b3aa77f4f8145216cc.png?size=2048", user: "726859310444970174"}]
        
    var banner = banners[Math.floor(Math.random() * banners.length)]
    var embed = new Discord.MessageEmbed()
    .setTitle("Mudei o banner do servidor.") 
    .setDescription(`Esse banner foi feito pelo <@${user}>.`) 
    .setColor("#0000ff") 
    .setImage(banner.url) 
    
    await social.setBanner(banner.url).catch(console.log) 
    if(channel) await client.channels.cache.get(channel).send(embed)
    return banner
}

module.exports.add = async (url, userid) => {
    if(!url) throw new TypeError("URL is not defined")
    
    var banners = JSON.parse(fs.readFileSync(bdir, "utf8"))
     
    if(!banners || typeof banners !== "array") banners = []

   /* var erro = null

    banners.forEach(b => {
        if(b.url.includes(url)) erro = "meh"
    })
    
    if(erro) throw new Error("Este url já está salvo.")
    */
    
    var has = await module.exports.has(url)
    if(has === true) throw new Error("Este url já está salvo.") 
    
    var info = {
        user: userid,
        url: url
    }
    
    banners.push(info)
    
    fs.writeFile(bdir, JSON.stringify(banners), (err) => { if (err) console.log(err) })
    
    return "sucess"
    
}

module.exports.has = async (url) => {
    
    var banners = JSON.parse(fs.readFileSync(bdir, "utf8"))

    var meh = null

    banners.forEach(b => {
        if(b.url.includes(url)) meh = "meh"
    })
    
    if(meh === "meh") return true
    else return false
}

module.exports.removeByURL = async (url) => {
    var has = await module.exports.has(url)
    
    if(has === false) throw new Error("Essa URL não está salva.")
    
    var banners = JSON.parse(fs.readFileSync(bdir, "utf8"))
    
    var filtro = []
    
    banners.forEach(b => {
        if(!b.url.includes(url)) filtro.push(b)
    })

    fs.writeFile(bdir, JSON.stringify(filtro), (err) => { if (err) console.log(err) })
    
    return filtro
}

module.exports.removeByID = async (id) => {
    
    var banners = JSON.parse(fs.readFileSync(bdir, "utf8"))
    
    var filtro = []
    
    banners.forEach(b => {
        if(!b.user.includes(id)) filtro.push(b)
    })
    
    fs.writeFile(bdir, JSON.stringify(filtro), (err) => { if (err) console.log(err) })
    
    return filtro
}

module.exports.get = {
    get list()  {
    var banners = JSON.parse(fs.readFileSync(bdir, "utf8"))
    
    return banners
    }
}

module.exports.list = module.exports.get.list
