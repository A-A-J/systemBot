const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data : new SlashCommandBuilder()
     .setName('hi')
     .setDescription('test test'),
     async execute(interaction, client){
        interaction.reply({content:'hi! hi!'})
     }
}