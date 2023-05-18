const {setJoinMessage} = require('../../../foundations/mongo/guildManager')

module.exports = async (client, message, arguments) => {

    const newJoinMessage = arguments.join(' ')

    const mongoDb = client.db
    const guildId = message.guild.id

    setJoinMessage(mongoDb, guildId, newJoinMessage).then(() => {
        message.channel.send('Successfully overwritten your welcome message.')
    }).catch(err => {
        message.reply(`There was an error while overwriting your message: ${err.message}`)
    })
}