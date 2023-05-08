const getAniListAnime = require("./getAniListAnime")
const formatDelta = require("../time/formatDelta")
const generateEmbed = require("../embed/generateEmbed")

module.exports = (animeName, channel, onlyIfSoon = false) => {
    getAniListAnime(animeName).then(jsonData => {
        const nextEpisode = jsonData['nextAiringEpisode']

        if (!nextEpisode) {
            throw new Error('Could not find any airing episodes.')
        }

        const title = jsonData['title']
        const animeTitle = `${title['romaji']} / ${title['english']} / ${title['native']}`

        const airingDateUnixInSec = nextEpisode['airingAt']
        const airingDate = new Date(airingDateUnixInSec * 1000).toDateString()
        const airingLeft = formatDelta(nextEpisode['timeUntilAiring'])

        if (onlyIfSoon && (airingLeft['hours'] !== 0 || airingLeft['days'] !== 0)) {
            return
        }

        const embedDescription = `Anime Title: ${animeTitle}\n`
            + `\nNew Episode: \`${nextEpisode['episode']}\`\n`
            + `Airing at: \`${airingDate}\`\n`
            + `Time left: \`${airingLeft['days']}d\` \`${airingLeft['hours']}h\` \`${airingLeft['minutes']}m\` \`${airingLeft['seconds']}s\`\n`

        const embed = generateEmbed(`Found airing episode`)
        embed.setURL(`https://anilist.co/anime/${jsonData['id']}`)
        embed.setImage(jsonData['bannerImage'])
        embed.setThumbnail(jsonData['coverImage']['large'])

        embed.setDescription(embedDescription)

        channel.send({embeds: [embed]})
    }).catch(err => {
        if (onlyIfSoon) {
            return
        }
        channel.send(`Error while fetching anime: ${err.message}`)
    })
}