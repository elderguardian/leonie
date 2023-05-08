const {PermissionsBitField} = require("discord.js");
const {addShow, getShows, removeShow, setNewsChannel} = require("../../foundations/mongo/guildManager");
const getAniListAnime = require("../../foundations/anime/getAniListAnime");
const parseTitle = require('../../foundations/anime/parseTitle')

const addOperation = async (client, message, show) => {

    let showData
    try {
        showData = await getAniListAnime(show)
    } catch (err) {
        message.channel.send(`Error getting anime data: ${err.message}`)
        return
    }

    let title = showData['title']
    const showTitle = parseTitle(title)

    const mongoDb = client.db
    const guildId = message.guild.id

    try {
        await addShow(mongoDb, guildId, showTitle)
        message.channel.send(`Added show \`${showTitle}\` to the list.`)
    } catch (err) {
        message.channel.send(`Error while adding show: ${err.message}`)
    }
}

const removeOperation = (client, message, show) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    removeShow(mongoDb, guildId, show).then(() => {
        message.channel.send(`Removed show \`${show}\` from the list.`)
    }).catch(err => {
        message.channel.send(`Error while removing show: ${err.message}`)
    })
}

const listOperation = (client, message, show) => {
    const mongoDb = client.db
    const guildId = message.guild.id

    getShows(mongoDb, guildId).then(shows => {
        message.channel.send(`Shows: \`${shows.join(', ')}\``)
    }).catch(err => {
        message.channel.send(`Error while fetching shows: ${err.message}`)
    })
}

const setChannelOperation = (client, message, show) => {
    const channel = message.mentions.channels.first()

    if (!channel) {
        message.channel.send('Please mention a channel.')
        return
    }

    const mongoDb = client.db
    const guildId = message.guild.id
    const channelId = channel.id

    setNewsChannel(mongoDb, guildId, channelId).then(() => {
        message.channel.send(`News channel was set to \`${channel.name}\`.`)
    }).catch(err => {
        message.channel.send(`Error while setting channel: ${err.message}`)
    })
}


module.exports = {
    'usage': '<operation>',
    'filter': {
        'sender': [
            PermissionsBitField.Flags.Administrator
        ],
    },
    'callback': (client, message, [operation, ...showSplit]) => {
        const show = showSplit.join(' ')
        operation = operation ?? 'help'

        switch (operation.toLowerCase()) {
            case 'add': addOperation(client, message, show); break
            case 'remove': removeOperation(client, message, show); break
            case 'ls': listOperation(client, message, show); break
            case 'set-channel': setChannelOperation(client, message, show); break
            default:
                message.channel.send('Please use a valid argument. Valid arguments are `add`, `remove`,`set-channel` and `ls`')
                break
        }
    }
}