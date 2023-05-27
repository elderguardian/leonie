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

const getGuildOrNull = async (guilds, guildId) => {
    try {
        return getGuildOrError(guilds, guildId)
    } catch (err) {
        return null
    }
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
        ? {$addToSet: {anime_news_shows: show}}
        : {$pull: {anime_news_shows: show}}

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

const clearShows = (mongoDb, guildId) => {
    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    guilds.updateOne({discord_id: guildId}, {$set: {anime_news_shows: []}})
}

const getWelcomeChannel = async (mongoDb, guildId) => {
    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrError(guilds, guildId)
    return guild['welcome_channel']
}

const getNewsChannel = async (mongoDb, guildId) => {
    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    const guild = await getGuildOrError(guilds, guildId)
    return guild['anime_news_channel']
}

const setWelcomeChannel = async (mongoDb, guildId, channelId) => {

    if (!channelId || channelId === '') {
        throw new Error('Channel id can not be empty.')
    }

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    guilds.updateOne({discord_id: guildId}, {$set: {welcome_channel: channelId,},})

}

const setNewsRole = async (mongoDb, guildId, roleId) => {

    if (!roleId || roleId === '') {
        throw new Error('Role id can not be empty.')
    }

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    guilds.updateOne({discord_id: guildId}, {$set: {anime_news_role: roleId}})
}

const setLeaveMessage = async (mongoDb, guildId, message) => {

    if (!message || message === '') {
        throw new Error('Leave message can not be empty.')
    }

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    guilds.updateOne({discord_id: guildId}, {
        $set: {
            welcome_message_leave: message,
        },
    })

}

const setJoinMessage = async (mongoDb, guildId, message) => {

    if (!message || message === '') {
        throw new Error('Join message can not be empty.')
    }

    const database = mongoDb.db('leonie')
    const guilds = database.collection('guilds')

    guilds.updateOne({discord_id: guildId}, {
        $set: {
            welcome_message_join: message,
        },
    })

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
    setWelcomeChannel,
    getWelcomeChannel,
    getGuildOrError,
    getGuildOrNull,
    showExists,
    clearShows,
    setJoinMessage,
    setLeaveMessage,
}