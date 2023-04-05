const generateEmbed = require('./generateEmbed')

module.exports = (message, title, url) => {
    message.channel.send({
        embeds: [
            generateEmbed(message, title).setImage(url)
        ]
    })
}