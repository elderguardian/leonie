const {PermissionsBitField} = require("discord.js")
const {statusOperation, getChannelOperation, setChannelOperation, listOperation, removeOperation, addOperation} = require("./operationBarrel");

const opCallbacks = {
    'add': addOperation,
    'remove': removeOperation, 'rm': removeOperation,
    'list': listOperation, 'ls': listOperation,
    'set-channel': setChannelOperation,
    'get-channel': getChannelOperation,
    'status': statusOperation,
}

module.exports = {
    'usage': '<operation>',
    'filter': {
        'sender': [
            PermissionsBitField.Flags.Administrator
        ],
    },
    'callback': (client, message, [operation, ...showSplit]) => {
        const show = showSplit.join(' ')
        operation = (operation ?? 'help').toLowerCase()

        const operationCallback = opCallbacks[operation]

        if (!operationCallback) {
            const validOperations = Object.keys(opCallbacks)
            const validOperationString = `\`${validOperations.join('`, `')}\``
            message.channel.send(`This command requires an operation as argument. Valid operations are ${validOperationString}`)
            return
        }

        operationCallback(client, message, show)
    }
}