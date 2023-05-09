const {PermissionsBitField} = require("discord.js")
const addOperation = require('./addOperation')
const removeOperation = require('./removeOperation')
const listOperation = require('./listOperation')
const setChannelOperation = require('./setChannelOperation')
const getChannelOperation = require('./getChannelOperation')

module.exports = {
    'usage': '<operation>',
    'filter': {
        'sender': [
            PermissionsBitField.Flags.Administrator
        ],
    },
    'callback': (client, message, [operation, ...showSplit]) => {
        const show = showSplit.join(' ')
        operation = operation ?? 'help'

        switch (operation.toLowerCase()) {
            case 'add': addOperation(client, message, show); break
            case 'remove': removeOperation(client, message, show); break
            case 'ls': listOperation(client, message, show); break
            case 'set-channel': setChannelOperation(client, message, show); break
            case 'get-channel': getChannelOperation(client, message); break
            default:
                message.channel.send('Please use a valid argument. Valid arguments are `add`, `remove`,`set-channel` and `ls`')
                break
        }
    }
}