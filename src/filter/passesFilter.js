const {lengthIsOkay, typesAreOkay} = require("./arguments");
const {hasPerms} = require("./permissions");

module.exports = (config, message, arguments) => {
    if (!config) {
        return true
    }

    const isNsfwCommand = config.nsfw ?? false

    if (isNsfwCommand && !message.channel.nsfw) {
        return false
    }

    const senderFilter = config.sender
    if (senderFilter) {
        const senderPermissions = message.guild.members.resolve(message.author).permissions

        if (!hasPerms(senderPermissions, senderFilter)) {
            return false
        }
    }

    const botFilter = config.bot
    if (botFilter) {
        const botPermissions = message.guild.members.me.permissions

        if (!hasPerms(botPermissions, botFilter)) {
            return false
        }
    }

    const argumentConfig = config.arguments

    if (!argumentConfig) {
        return true
    }

    return lengthIsOkay(argumentConfig, arguments) && typesAreOkay(argumentConfig, arguments)
}