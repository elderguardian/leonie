

module.exports = {
    'ready': (client) => {
        client.user.setStatus(client.config.bot.activity.status)
        client.user.setActivity(client.config.bot.activity.message)
    }
}