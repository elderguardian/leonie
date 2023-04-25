const Bot = require('./Bot')
const config = require('../config.json')

const commands = require('./lists/commands')
const events = require('./lists/events')
const schedules = require('./lists/schedules')

const bot = new Bot(config, commands, events, schedules)

bot.run()