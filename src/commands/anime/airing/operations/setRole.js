const {setNewsRole} = require("../../../../foundations/mongo/guildManager")

module.exports = (client, message) => {
    const role = message.mentions.roles.first()

    if (!role) {
        message.channel.send('Please mention a role.')
        return
    }

    const mongoDb = client.db
    const guildId = message.guild.id
    const roleId = role.id

    setNewsRole(mongoDb, guildId, roleId).then(() => {
        message.channel.send(`News role was set to \`${role.name}\`.`)
    }).catch(err => {
        message.channel.send(`Error while setting channel: ${err.message}`)
    })
}