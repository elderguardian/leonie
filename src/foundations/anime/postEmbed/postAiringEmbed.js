const formatDelta = require("../../time/formatDelta")
const generateEmbed = require("../../embed/generateEmbed")

module.exports = (animeData, channel) => {
    const nextEpisode = animeData['nextAiringEpisode']

    if (!nextEpisode) {
        throw new Error('Could not find any airing episodes.')
    }

    const title = animeData['title']
    const animeTitle = `${title['romaji']} / ${title['english']} / ${title['native']}`

    const airingDateUnixInSec = nextEpisode['airingAt']
    const airingDate = new Date(airingDateUnixInSec * 1000).toDateString()
    const airingLeft = formatDelta(nextEpisode['timeUntilAiring'])

    const embedDescription = `Anime Title: ${animeTitle}\n`
        + `\nNew Episode: \`${nextEpisode['episode']}\`\n`
        + `Airing at: \`${airingDate}\`\n`
        + `Time left: \`${airingLeft['days']}d\` \`${airingLeft['hours']}h\` \`${airingLeft['minutes']}m\` \`${airingLeft['seconds']}s\`\n`

    const embed = generateEmbed(`Found airing episode`)
    embed.setURL(`https://anilist.co/anime/${animeData['id']}`)
    embed.setImage(animeData['bannerImage'])
    embed.setThumbnail(animeData['coverImage']['large'])

    embed.setDescription(embedDescription)

    channel.send({embeds: [embed]})
}