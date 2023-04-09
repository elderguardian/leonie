const passesFilter = require('./filter/passesFilter')

class CommandHandler {

    constructor() {

    }

    handleMessage(client, message) {
        const prefix = client.config.bot.prefix;

        if (message.content.indexOf(prefix) !== 0) {
            return
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase()

        const commandObject = client.commands.get(command)

        if (!commandObject) {
            return
        }

        const filter = commandObject.filter

        try {
            passesFilter(filter, message, args)
            commandObject.callback(client, message, args)
        } catch (err) {
            message.reply(`An error occurred: \`${err.message}\``)
        }
    }

}

module.exports = CommandHandler
