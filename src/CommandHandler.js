
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

        const callback = client.commands.get(command)

        if (!callback) {
            return
        }

        callback(client, message, args)
    }

}

module.exports = CommandHandler
