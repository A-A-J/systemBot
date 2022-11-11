const { REST, Routes } = require('discord.js');
const { token, botID } = require('../../config.json');
const fs = require('fs');
const chalk = require('chalk');
const ascii = require('ascii-table');
const table = new ascii().setHeading('folder', 'file', 'status');

module.exports = async (client) =>{
    let commandArray = []
    for( const folder of fs.readdirSync('./src/commands') ){
        for( const file of fs.readdirSync(`./src/commands/${folder}`).filter((f) => f.endsWith('js')) ){
            try {
                const command = require(`../../commands/${folder}/${file}`);
                if( command.data ){
                    client.commands.set(command.data.name, command)
                    commandArray.push(command.data.toJSON());
                }else{
                    table.addRow(folder, file, 'Error');
                }
            } catch (error) {
                console.error(error)
                table.addRow(folder, file, 'Error');
            }
        }
    }
    const rest = new REST({version:"10"}).setToken(token);
    try {
        console.log(chalk.gray(`Startes refreshing ${commandArray.length} application (/) commands`))
        const data = await rest.put(Routes.applicationCommands(botID), {body:commandArray})
        console.log(chalk.greenBright(`Successfuly reloaded ${data.length} application (/) commands `))
    } catch (error) {
        console.log(error)
    }
    if(table.__rows.length != 0) return console.log(chalk.redBright(table.toString()));
}