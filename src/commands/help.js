const sendTextEmbed = require('../foundations/embed/sendTextEmbed')

module.exports = {
    'filter': {
        'arguments': {
            max: 1,
        },
    },
    'callback': (client, message, arguments) => {

        let embedString = ''

        const commands = [...client.commands.keys()]
        const metadata = [...client.commands.values()]

        for (let i = 0; i < commands.length; i++) {
            embedString += `\`${commands[i]}: ${metadata[i].usage ?? 'no arguments'}\`\n`
        }

        sendTextEmbed(message, 'commands list', embedString)
    }
}


