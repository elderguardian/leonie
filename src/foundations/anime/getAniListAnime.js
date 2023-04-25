
const query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
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
    synonyms
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
  }
}
`;

const getAniListAnime = async (id) => {
    const parameterVars = {
        id: id
    }

    const url = 'https://graphql.anilist.co/anime/search'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',

        },
        body: JSON.stringify({
            query: query,
            variables: parameterVars
        })
    }

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error('AniList API Response was not okay!')
        }

        return (await response.json())['data']['Media']
    } catch (err) {
        throw new Error(`Could not fetch the AniList API: ${err.message}`)
    }
}

module.exports = getAniListAnime

