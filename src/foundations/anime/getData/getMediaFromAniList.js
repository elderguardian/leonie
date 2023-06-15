const filteredByType = require('./queries/filteredByType')
const notFiltered = require('./queries/notFiltered')

const getMediaFromAniList = async (name, type = null) => {

    if (!name || name === '') {
        throw new Error('Name can not be empty.')
    }

    const parameterVars = {
        search: name,
        page: 1,
        perPage: 1,
    }

    if (type) {
        parameterVars['type'] = type
    }

    const url = 'https://graphql.anilist.co'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: type ? filteredByType : notFiltered,
            variables: parameterVars
        })
    }

    try {
        const response = await fetch(url, options)

        console.log(response)

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

const getAniList = async name => getMediaFromAniList(name)
const getAniListAnime = async name => getMediaFromAniList(name, 'ANIME')
const getAniListManga = async name => getMediaFromAniList(name, 'MANGA')

module.exports = {
    getAniListAnime,
    getAniListManga,
    getAniList,
}