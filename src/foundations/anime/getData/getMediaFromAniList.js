const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search, type: {{ $TYPE_PLACEHOLDER }}) {
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
}
`;

const getMediaFromAniList = async (name, type) => {

    if (!name || name === '') {
        throw new Error('Name can not be empty.')
    }

    const parameterVars = {
        search: name,
        page: 1,
        perPage: 1
    }

    const url = 'https://graphql.anilist.co'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query.replace('{{ $TYPE_PLACEHOLDER }}', type),
            variables: parameterVars
        })
    }

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error('AniList API Response was not okay!')
        }

        const jsonData = await response.json()
        const mediaData = jsonData['data']['Page']['media']

        if (!mediaData || mediaData.length <= 0) {
            throw new Error('Could not find an anime with that name.')
        }

        return mediaData[0]
    } catch (err) {
        throw new Error(`Could not fetch the AniList API: ${err.message}`)
    }
}

const getAniListAnime = async name => getMediaFromAniList(name, 'ANIME')
const getAniListManga = async name => getMediaFromAniList(name, 'MANGA')

module.exports = {
    getAniListAnime,
    getAniListManga,
}