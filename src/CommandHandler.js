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

        if (!passesFilter(filter, args)) {
            message.reply('Invalid command usage.')
            return
        }

        commandObject.callback(client, message, args)
    }

}

module.exports = CommandHandler
