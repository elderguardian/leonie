
module.exports = {
    'help': require('../commands/help'),

    'ping': {
        'callback': (client, message, arguments) => {
            message.reply('pong!')
        }
    },

    'register-guild': require('../commands/mod/register-guild'),

    'weather': require('../commands/util/weather'),
    'math': require('../commands/util/math'),
    'sb': require('../commands/util/safebooru'),
    'kn': require('../commands/util/kona'),
    'liyuu': require('../commands/util/liyuu'),

    'next-episode': require('../commands/anime/nextEpisode'),
    'anime': require('../commands/anime/anime'),
    'anime-news': require('../commands/anime/news'),

    'purge': require('../commands/mod/purge'),
    'ban': require('../commands/mod/ban'),
    'kick': require('../commands/mod/kick'),
    'mute': require('../commands/mod/mute'),
}