const { Client, GatewayIntentBits, Partials, Collection} = require('discord.js')

class Bot {

    constructor(config, commands, events) {
        this.config = config
        this.commands = commands
        this.events = events
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
            this.client.on(event, callback)
        }
    }

    onMessage(client, message) {
        const prefix = this.config.bot.prefix;

        if (message.content.indexOf(prefix) !== 0) {
            return
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const command = args.shift().toLowerCase()

        const callback = client.commands.get(command)

        if (!callback) {
            return
        }

        callback(client, message, args)
    }

    run() {
        this.client.config = this.config
        this.loadCommands()
        this.loadEvents()

        this.client.on('messageCreate', message => {
            this.onMessage(this.client, message)
        })

        this.client.login(this.config.bot.token).catch(err => {
            console.log('Error thrown. ', err)
        })
    }
}

module.exports = Bot