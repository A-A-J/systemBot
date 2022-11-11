const { Events } = require('discord.js');
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction,client){
        if( interaction.isChatInputCommand() ){
            const command = client.commands.get(interaction.commandName);
            if( !command ) return
            try {
                command.execute(interaction,client)
            } catch (er) {
                console.error(er);
                interaction.reply({content:er.message})
            }
        }
    }
}