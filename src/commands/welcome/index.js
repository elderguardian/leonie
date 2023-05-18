const {PermissionsBitField} = require("discord.js")

const opCallbacks = {
    'status': require('./operations/statusOperation'),
    'set-channel': require('./operations/setChannelOperation'),
    'get-channel': require('./operations/getChannelOperation'),
    'set-join-message': require('./operations/setJoinMessage'),
    'set-leave-message': require('./operations/setLeaveMessage'),
}

module.exports = {
    'usage': '<operation>',
    'filter': {
        'sender': [
            PermissionsBitField.Flags.Administrator
        ],
    },
    'callback': (client, message, [operation, ...arguments]) => {
        operation = (operation ?? 'help').toLowerCase()
        const operationCallback = opCallbacks[operation]

        if (!operationCallback) {
            const validOperations = Object.keys(opCallbacks)
            const validOperationString = `\`${validOperations.join('`, `')}\``
            message.channel.send(`This command requires an operation as argument. Valid operations are ${validOperationString}`)
            return
        }

        operationCallback(client, message, arguments)
    }
}