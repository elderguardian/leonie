const getAniListAnime = require("../../foundations/anime/getAniListAnime")
const generateEmbed = require('../../foundations/embed/generateEmbed')
const formatDelta = require('../../foundations/time/formatDelta')

module.exports = {
    'usage': '<id>',
    'filter': {
        'arguments': {
            min: 1,
            max: 2,
            type: ['integer']
        },
    },
    'callback': (client, message, arguments) => {
        const animeId = arguments[0]
        getAniListAnime(animeId).then(jsonData => {
            const nextEpisode = jsonData['nextAiringEpisode']

            if (!nextEpisode) {
                throw new Error('Could not find any airing episodes.')
            }

            const title = jsonData['title']
            const animeTitle = `${title['romaji']} / ${title['english']} / ${title['native']}`

            const airingDate = new Date(nextEpisode['airingAt']).toDateString()
            const airingLeft = formatDelta(nextEpisode['timeUntilAiring'])

            const embedDescription = `Anime Title: ${animeTitle}\n`
                + `\nNew Episode: \`${nextEpisode['episode']}\`\n`
                + `Airing at: \`${airingDate}\`\n`
                + `Time left: \`${airingLeft['days']}d\` \`${airingLeft['hours']}h\` \`${airingLeft['minutes']}m\` \`${airingLeft['seconds']}s\`\n`

            const embed = generateEmbed(`Found airing episode`)
            embed.setURL(`https://anilist.co/anime/${animeId}`)
            embed.setImage(jsonData['bannerImage'])
            embed.setThumbnail(jsonData['coverImage']['large'])

            embed.setDescription(embedDescription)


            message.channel.send({embeds: [embed]})
        }).catch(err => {
            message.reply(`Error while fetching anime: ${err.message}`)
        })
    }
}

/*
    id
    title {
      romaji
      english
      native
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    coverImage {
      large
      medium
    }
    bannerImage
    format
    type
    status
    episodes
    chapters
    volumes
    season
    description
    averageScore
    meanScore
    genres
    synonym
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
  }
}
 */

