const parseTitle = require("./parseTitle");
const generateEmbed = require("../embed/generateEmbed");

module.exports = (animeData, channel) => {
    let title = animeData['title']
    const embedTitle = parseTitle(title)

    title = {
        english: title['english'] ? title['english'] : 'English title unknown.',
        romaji: title['romaji'] ? title['romaji'] : 'Romaji title unknown.',
        native: title['native'] ? title['native'] : 'Native title unknown.',
    }

    const displayedAnimeTitle = `${title['romaji']} / ${title['english']} / ${title['native']}`

    const startDate = animeData['startDate']
    const endDate = animeData['endDate']

    const displayedStartDate = startDate['day'] && startDate['month'] && startDate['year']
        ?  `${startDate['day']}.${startDate['month']}.${startDate['year']}`
        : 'Unknown'

    const displayedEndDate = !endDate['day'] || !endDate['month'] || !endDate['year']
        ? "Did not end yet."
        : `${endDate['day']}.${endDate['month']}.${endDate['year']}`

    const displayedEpisodeCount = animeData['episodes']
        ? animeData['episodes']
        : "Unknown"

    const genres = animeData['genres'].length <= 0 ? 'none' : animeData['genres'].join(', ')

    const description = `**Title:** ${displayedAnimeTitle}\n`
        + `\nStart: \`${displayedStartDate}\`\n`
        + `End: \`${displayedEndDate}\`\n`

        + `\nStatus: \`${(animeData['status'] ?? 'unknown').toLowerCase()}\`\n`
        + `Amount of episodes: \`${displayedEpisodeCount}\`\n`
        + `Average Score: \`${animeData['averageScore'] ?? 'Unknown'}\`\n`

        + `\nGenres: \`${genres}\`\n`

    const embed = generateEmbed(embedTitle)
        .setDescription(description)
        .setURL(`https://anilist.co/anime/${animeData['id']}`)
        .setImage(animeData['bannerImage'])
        .setThumbnail(animeData['coverImage']['large'])
        .setAuthor({
            name: 'AniList Search',
            url: 'https://anilist.co/',
        })
        .setFooter({
            text: 'If this is not what you searched, complain to AniList',
        })

    channel.send({embeds: [embed]})
}