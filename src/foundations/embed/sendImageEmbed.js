const generateEmbed = require('./generateEmbed')

module.exports = (channel, title, url, author = false) => {
    let baseEmbed = generateEmbed(title)

    if (author) {
        baseEmbed.setFooter({
            text: `Requested by ${author.username}`
        })
    }

    baseEmbed.setImage(url)
    channel.send({embeds: [baseEmbed]})
}