const {PermissionsBitField} = require("discord.js")
const {statusOperation, getChannelOperation, setChannelOperation, listOperation, removeOperation, addOperation} = require("./operationBarrel");

module.exports = {
    'usage': '<operation>',
    'filter': {
        'sender': [
            //PermissionsBitField.Flags.Administrator
        ],
    },
    'callback': (client, message, [operation, ...showSplit]) => {
        const show = showSplit.join(' ')
        operation = operation ?? 'help'

        switch (operation.toLowerCase()) {
            case 'add': addOperation(client, message, show); break
            case 'remove': removeOperation(client, message, show); break
            case 'ls': listOperation(client, message); break
            case 'set-channel': setChannelOperation(client, message); break
            case 'get-channel': getChannelOperation(client, message); break
            case 'status': statusOperation(client, message); break
            default:
                message.channel.send('Please use a valid argument. Valid arguments are `add`, `remove`,`set-channel`,`get-channel`,`status` and `ls`')
                break
        }
    }
}