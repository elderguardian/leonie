const generateEmbed = require('./generateEmbed')

module.exports = (message, title, description) => {
    message.channel.send({
        embeds: [
            generateEmbed(message, title)
                .setDescription(description.length < 1 ? 'undefined' : description)
        ]
    })
}