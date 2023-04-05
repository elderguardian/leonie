module.exports = {
    'ping': {
        'callback': (client, message, arguments) => {
            message.reply('pong!')
        }
    },
    'echo-num': require('../commands/echo-num')
}