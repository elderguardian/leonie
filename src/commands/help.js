const generateEmbed = require('../foundations/embed/generateEmbed')

module.exports = {
    'usage': '<command>',
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

            const {min, max} = commandMetadata.filter.arguments || {}

            const argumentAmount = max ?? false
                ? max - (min ?? 0)
                : 'infinite'


            const embed = generateEmbed(`Details for command: ${wantedCommand}`)
                .addFields(
                    {
                        name: 'Usage',
                        value: commandMetadata.usage ? commandMetadata.usage : 'no arguments',
                        inline: true,
                    }, {
                        name: 'Arguments',
                        value: `${argumentAmount}`,
                        inline: true,
                    }, {
                        name: 'NSFW',
                        value: commandMetadata.filter.nsfw ? 'yes' : 'no',
                        inline: true,
                    },
                )

            message.channel.send({embeds: [embed]})

        } else {
            const embed = generateEmbed('List of valid commands with usage.')
            embed.setDescription('For more details add a command name as a parameter.')

            const commands = [...client.commands.keys()]
            const metadata = [...client.commands.values()]

            for (let i = 0; i < commands.length; i++) {
                embed.addFields({
                    name: commands[i],
                    value: metadata[i].usage ? metadata[i].usage : 'no arguments',
                    inline: true,
                })
            }

            message.channel.send({embeds: [embed]})
        }
    }
}


