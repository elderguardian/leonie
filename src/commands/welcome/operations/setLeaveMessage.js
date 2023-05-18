const {setLeaveMessage} = require('../../../foundations/mongo/guildManager')

module.exports = async (client, message, arguments) => {

    const newLeaveMessage = arguments.join(' ')

    const mongoDb = client.db
    const guildId = message.guild.id

    setLeaveMessage(mongoDb, guildId, newLeaveMessage).then(() => {
        message.channel.send('Successfully overwritten your leave message.')
    }).catch(err => {
        message.reply(`There was an error while overwriting your message: ${err.message}`)
    })
}