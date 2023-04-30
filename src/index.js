const Bot = require('./Bot')
const config = require('../config.json')

const commands = require('./lists/commands')
const events = require('./lists/events')
const schedules = require('./lists/schedules')

const {init} = require('./foundations/mongo/database')

init(config.mongo.url, (db, err) => {
    if (!db || err) {
        throw new Error(`Could not connect to database: ${err.message}`)
    }

    const bot = new Bot(config, db, commands, events, schedules)
    bot.run()
})