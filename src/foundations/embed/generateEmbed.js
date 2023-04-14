const {EmbedBuilder} = require("discord.js");

module.exports = (title) => {
    return new EmbedBuilder()
        .setColor([75, 157, 239])
        .setTitle(title.length < 1 ? 'undefined' : title)
}