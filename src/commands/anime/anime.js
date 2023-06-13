const getAniListAnime = require("../../foundations/anime/getAniListAnime")
const postAnimeData = require("../../foundations/anime/postAnimeData")

module.exports = {
    'usage': '<name>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': async (client, message, arguments) => {
        const animeName = arguments.join(' ')
        let animeData;

        try {
            animeData = await getAniListAnime(animeName)
        } catch (err) {
            message.channel.send(`Error while fetching anime: ${err.message}`)
            return
        }

        postAnimeData(animeData, message.channel)
    }
}
