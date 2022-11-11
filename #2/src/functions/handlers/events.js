const fs = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('event', 'file', 'status');
const chalk = require('chalk');

module.exports = async (client) =>{
    for( const folder of fs.readdirSync('./src/events') ){
        const eventFolder = fs.readdirSync(`./src/events/${folder}`).filter((f) => f.endsWith('js'));
        switch (folder) {
            case 'client':
                for( const file of eventFolder ){
                    try {
                        const event = require(`../../events/${folder}/${file}`);
                        if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    } catch (error) {
                        console.error(error)
                        table.addRow(folder, file, 'error')
                    }
                }
                break;

            
            case 'guilds':
                for( const file of eventFolder ){
                    try {
                        const event = require(`../../events/${folder}/${file}`);
                        if(event.once) client.once(event.name, (...args) => event.execute(...args, client));
                        else client.on(event.name, (...args) => event.execute(...args, client));
                    } catch (error) {
                        console.error(error)
                        table.addRow(folder, file, 'error')
                    }
                }
                break;
        }
    }
    if(table.__rows.length != 0) return console.log(chalk.redBright(table.toString()));
}