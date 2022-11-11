const { Events } = require('discord.js')
module.exports = {
    name: Events.ClientReady,
    async execute(client){
        console.info("-----------------------")
        console.info(`BOT:         ${client.user.tag}`)
        console.info(`SERVERS:     ${client.guilds.cache.size}`)
        console.info(`USERS:       ${client.users.cache.size}`)
        console.info("-----------------------")
    }
}