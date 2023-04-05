const randomCommand = require('../commands/random/randomCommand')

module.exports = {
    'ping': {
        'callback': (client, message, arguments) => {
            message.reply('pong!')
        }
    },
    'echo-num': require('../commands/echo-num'),

    'dick': randomCommand('dick', 25),
    'boob-size': randomCommand('boobs', 8),
    'gay': randomCommand('progress', 100),

    'weather': require('../commands/weather'),
    'math': require('../commands/math'),
    'sb': require('../commands/safebooru'),
}