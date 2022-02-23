const { Client, Intents } = require('discord.js');
const dotenv = require("dotenv")
if (process.env.NODE_ENV != 'production') { dotenv.config() }
const TOKEN = process.env.TOKEN
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$"

client.on('ready', () => {
    client.user.setActivity('Day Trade do Sucesso', ({ type: "PLAYING" }))
    console.log("Estou online")
    console.log(`Bot iniciado em ${client.channels.cache.size} canais de ${client.guilds.cache.size} servidores`)
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return

    if(message.content.startsWith(prefix) && message.content.length > 2){
        const args = message.content.trim().slice(prefix.length).split(/ +/g);
        const commandName = args.shift().toLocaleLowerCase();

        if(commandName === "ping"){
            await message.reply({ content: `Pong!` });
        }

    }

})

client.login(TOKEN);