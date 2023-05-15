

const registerGuild = async (guilds, guildId) => {
    const guild = await guilds.findOne({
        discord_id: guildId,
    })

    if (guild) {
        throw new Error('This guild has already been registered.')
    }

    await guilds.insertOne({
        discord_id: guildId,
    })

}

const getGuildOrError = async (guilds, guildId) => {
    const guild = await guilds.findOne({
        discord_id: guildId,
    })

    if (!guild) {
        throw new Error('This guild has not been registered yet.')
    }

    return guild
}

const updateShow = async (type, mongoDb, guildId, show) => {

    if (!show || show === '') {
        throw new Error('Show name can not be empty.')
    }

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrError(guilds, guildId)

    const updatedData = type === 'push'
        ? { $addToSet: { anime_news_shows: show }}
        : { $pull: { anime_news_shows: show }}

    guilds.updateOne({discord_id: guildId}, updatedData)

}

const showExists = async (mongoDb, guildId, showName) => {

    if (!showName || showName === '') {
        throw new Error('Show name can not be empty.')
    }

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrError(guilds, guildId)

    return guild['anime_news_shows'].includes(showName)
}

const addShow = async (mongoDb, guildId, show) => {
    await updateShow('push', mongoDb, guildId, show)
}

const removeShow = async (mongoDb, guildId, show) => {
    await updateShow('pull', mongoDb, guildId, show)
}

const getShows = async (mongoDb, guildId) => {
    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrError(guilds, guildId)
    const shows = guild['anime_news_shows']

    if (!shows || shows.length <= 0) {
        throw new Error('Could not find any shows for that guild')
    }

    return shows
}

const getNewsChannel = async (mongoDb, guildId) => {
    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrError(guilds, guildId)
    return guild['anime_news_channel']
}

const setNewsChannel = async (mongoDb, guildId, channelId) => {

    if (!channelId || channelId === '') {
        throw new Error('Channel id can not be empty.')
    }

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    guilds.updateOne({discord_id: guildId}, {
        $set: {
            anime_news_channel: channelId,
        },
    })

}

module.exports = {
    registerGuild,
    addShow,
    removeShow,
    getShows,
    setNewsChannel,
    getNewsChannel,
    getGuildOrError,
    showExists,
}