const getAniListAnime = require("../../foundations/anime/getAniListAnime")
const generateEmbed = require('../../foundations/embed/generateEmbed')

module.exports = {
    'usage': '<id>',
    'filter': {
        'arguments': {
            min: 1,
        },
    },
    'callback': (client, message, arguments) => {
        const animeName = arguments.join(' ')

        getAniListAnime(animeName).then(jsonData => {
            const title = jsonData['title']
            const displayTitle = `${title['romaji']} / ${title['english']} / ${title['native']}`

            const startDate = jsonData['startDate']
            const endDate = jsonData['endDate']

            const genres = jsonData['genres'].length <= 0 ? 'none' : jsonData['genres'].join(', ')

            const description = `**Title:** ${displayTitle}\n`
                + `\nStart: \`${startDate['day']}.${startDate['month']}.${startDate['year']}\`\n`
                + `End: \`${endDate['day']}.${endDate['month']}.${endDate['year']}\`\n`

                + `\nStatus: \`${jsonData['status'].toLowerCase()}\`\n`
                +  `Amount of episodes: \`${jsonData['episodes']}\`\n`
                + `Average Score: \`${jsonData['averageScore']}\`\n`

                + `\nGenres: \`${genres}\`\n`

            const embed = generateEmbed(`Found your anime.`)
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
        }).catch(err => {
            message.channel.send(`Error while fetching anime: ${err.message}`)
        })

    }
}
