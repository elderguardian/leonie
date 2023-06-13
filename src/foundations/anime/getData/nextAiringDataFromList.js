const {getAniListAnime} = require("./getMediaFromAniList")

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async shows => {

    let nextAiringShow = {
        animeData: null,
        timeLeft: null,
    }

    for (const show of shows) {
        try {
            const currentAnimeData = await getAniListAnime(show)
            const nextEpisode = currentAnimeData['nextAiringEpisode']

            if (!nextEpisode) {
                continue
            }

            const airingLeft = nextEpisode['timeUntilAiring']
            const isFirstIteration = nextAiringShow.timeLeft === null
            const airsEarlier = airingLeft < nextAiringShow.timeLeft

            if (isFirstIteration || airsEarlier) {
                nextAiringShow.timeLeft = airingLeft
                nextAiringShow.animeData = currentAnimeData
            }

        } catch (err) {
            continue
        }

        await sleep(1000)
    }

    if (!nextAiringShow.animeData) {
        throw new Error("Could not find the next airing episode.")
    }

    return nextAiringShow.animeData
}