const getAniListAnime = require("../../foundations/anime/getAniListAnime")
const generateEmbed = require('../../foundations/embed/generateEmbed')
const parseTitle = require('../../foundations/anime/parseTitle')

module.exports = {
    'usage': '<name>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': async (client, message, arguments) => {
        const animeName = arguments.join(' ')
        let jsonData;

        try {
            jsonData = await getAniListAnime(animeName)
        } catch (err) {
            message.channel.send(`Error while fetching anime: ${err.message}`)
            return
        }

        let title = jsonData['title']
        const embedTitle = parseTitle(title)

        title = {
            english: title['english'] ? title['english'] : 'English title unknown.',
            romaji: title['romaji'] ? title['romaji'] : 'Romaji title unknown.',
            native: title['native'] ? title['native'] : 'Native title unknown.',
        }

        const displayedAnimeTitle = `${title['romaji']} / ${title['english']} / ${title['native']}`

        const startDate = jsonData['startDate']
        const endDate = jsonData['endDate']

        const displayedEndDate = !endDate['day'] || !endDate['month'] || !endDate['year']
            ? "Did not end yet."
            : `${endDate['day']}.${endDate['month']}.${endDate['year']}`

        const displayedEpisodeCount = jsonData['episodes']
            ? jsonData['episodes']
            : "Unknown"

        const genres = jsonData['genres'].length <= 0 ? 'none' : jsonData['genres'].join(', ')

        const description = `**Title:** ${displayedAnimeTitle}\n`
            + `\nStart: \`${startDate['day']}.${startDate['month']}.${startDate['year']}\`\n`
            + `End: \`${displayedEndDate}\`\n`

            + `\nStatus: \`${jsonData['status'].toLowerCase()}\`\n`
            + `Amount of episodes: \`${displayedEpisodeCount}\`\n`
            + `Average Score: \`${jsonData['averageScore']}\`\n`

            + `\nGenres: \`${genres}\`\n`

        const embed = generateEmbed(embedTitle)
            .setDescription(description)
            .setURL(`https://anilist.co/anime/${jsonData['id']}`)
            .setImage(jsonData['bannerImage'])
            .setThumbnail(jsonData['coverImage']['large'])
            .setAuthor({
                name: 'AniList Search',
                url: 'https://anilist.co/',
            })
            .setFooter({
                text: 'If this is not what you searched, complain to AniList',
            })

        message.channel.send({embeds: [embed]})
    }
}
