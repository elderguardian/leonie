const sendTextEmbed = require('../../foundations/embed/sendTextEmbed')
const generateDisplay = require('./generateDisplay')

module.exports = (message, judgedPerson, displayType, max) => {

    const randomLength = Math.floor(Math.random() * max)
    const display = generateDisplay(displayType, randomLength)

    sendTextEmbed(message, 'random machine', `Result for \`${judgedPerson}\`\n\n${display}`)
}