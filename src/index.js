const Bot = require('./Bot')
const config = require('../config.json')

const commands = require('./lists/commands')
const events = require('./lists/events')

const bot = new Bot(config, commands, events)

bot.run()