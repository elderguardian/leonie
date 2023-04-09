const {lengthIsOkay, typesAreOkay} = require("./arguments");
const {hasPerms} = require("./permissions");

module.exports = (config, message, arguments) => {
    if (!config) {
        return
    }

    const isNsfwCommand = config.nsfw ?? false

    if (isNsfwCommand && !message.channel.nsfw) {
        throw new Error('Channel is not NSFW')
    }

    const senderFilter = config.sender
    if (senderFilter) {
        const senderPermissions = message.guild.members.resolve(message.author).permissions

        if (!hasPerms(senderPermissions, senderFilter)) {
            throw new Error('Sender is missing permissions.')
        }
    }

    const botFilter = config.bot
    if (botFilter) {
        const botPermissions = message.guild.members.me.permissions

        if (!hasPerms(botPermissions, botFilter)) {
            throw new Error('Bot is missing permissions.')
        }
    }

    const argumentConfig = config.arguments

    if (!argumentConfig) {
        return
    }

    if (!lengthIsOkay(argumentConfig, arguments)) {
        throw new Error('Invalid amount of arguments.')
    }

    if (!typesAreOkay(argumentConfig, arguments)) {
        throw new Error('Argument types are not okay.')
    }

}