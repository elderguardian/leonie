const { Client, GatewayIntentBits, Partials, Collection} = require('discord.js')

const CommandHandler = require('./CommandHandler')
const schedule = require("node-schedule")

class Bot {

    constructor(config, db, commands, events, schedules) {
        this.config = config
        this.commands = commands
        this.events = events
        this.schedules = schedules
        this.client = new Client({
            intents: [
                GatewayIntentBits["DirectMessages"],
                GatewayIntentBits["Guilds"],
                GatewayIntentBits["GuildMembers"],
                GatewayIntentBits["GuildModeration"],
                GatewayIntentBits["GuildMessages"],
                GatewayIntentBits["MessageContent"],
                GatewayIntentBits["GuildMessageReactions"],
                GatewayIntentBits["GuildPresences"],
            ],
            partials: [Partials.Message, Partials.Channel, Partials.Reaction],
        })

        this.client.db = db
    }

    loadCommands() {
        const commandEntries = Object.entries(this.commands)
        this.client.commands = new Collection()

        for (const [command, callback] of commandEntries) {
            this.client.commands.set(command, callback)
        }
    }

    loadEvents() {
        const eventEntries = Object.entries(this.events)

        for (const [event, callback ] of eventEntries) {
            this.client.on(event, callback.bind(null, this.client))
        }
    }

    loadCronJobs() {
        this.schedules.forEach(jobData => {
            schedule.scheduleJob(jobData.pattern, () => {
                jobData.callback(this.client)
            })
        })
    }

    run() {
        const commandHandler = new CommandHandler();

        this.client.config = this.config
        this.loadCommands()
        this.loadEvents()
        this.loadCronJobs()

        this.client.on('messageCreate', message => {
            commandHandler.handleMessage(this.client, message)
        })

        this.client.login(this.config.bot.token).catch(err => {
            console.log('Error thrown. ', err)
        })
    }
}

module.exports = Bot