const generateEmbed = require('./generateEmbed')

module.exports = (channel, title, description, author = false) => {
    let baseEmbed = generateEmbed(title)

    if (author) {
        baseEmbed.setFooter({
            text: `Requested by ${author.username}`
        })
    }

    baseEmbed.setDescription(description.length < 1 ? 'undefined' : description)
    channel.send({embeds: [baseEmbed]})
}