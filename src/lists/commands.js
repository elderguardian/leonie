const randomCommand = require('../commands/random/randomCommand')

module.exports = {
    'help': require('../commands/help'),

    'ping': {
        'callback': (client, message, arguments) => {
            message.reply('pong!')
        }
    },

    'dick': randomCommand('dick', 25),
    'boob-size': randomCommand('boobs', 8),
    'gay': randomCommand('progress', 100),

    'weather': require('../commands/util/weather'),
    'math': require('../commands/util/math'),
    'sb': require('../commands/util/safebooru'),
    'kn': require('../commands/util/kona'),
    'liyuu': require('../commands/util/liyuu'),

    'purge': require('../commands/mod/purge'),
    'ban': require('../commands/mod/ban'),
    'kick': require('../commands/mod/kick'),
    'mute': require('../commands/mod/mute'),
}