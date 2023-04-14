const sendTextEmbed = require('../foundations/embed/sendTextEmbed')
const {arg} = require("mathjs");

module.exports = {
    'filter': {
        'arguments': {
            max: 2,
        },
    },
    'callback': (client, message, arguments) => {
        const wantedCommand = arguments[0]

        if (wantedCommand) {

            const commandMetadata = client.commands.get(wantedCommand)

            if (!commandMetadata) {
                message.reply('Command not found.')
                return
            }

            const { min, max } = commandMetadata.filter.arguments

            const argumentAmount = max ?? false
                    ? max - (min ?? 0)
                    : 'infinite'

            sendTextEmbed(message.channel, `${wantedCommand} help`,
                `usage: \`${commandMetadata.usage ?? 'none'}\`\n` +
                `arguments: \`${argumentAmount}\`\n` +
                `nsfw: \`${commandMetadata.filter.nsfw ? 'yes' : 'no'}\`\n`
            )


        } else {
            const commands = [...client.commands.keys()]
            const metadata = [...client.commands.values()]
            let embedString = ''

            for (let i = 0; i < commands.length; i++) {
                embedString += `\`${commands[i]}: ${metadata[i].usage ?? 'no arguments'}\`\n`
            }

            sendTextEmbed(message.channel, 'command list', embedString)
        }
    }
}


