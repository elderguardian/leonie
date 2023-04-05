const sendTextEmbed = require('../foundations/embed/sendTextEmbed')
const calculate = require('../foundations/math/calculate')

module.exports = {
    'filter': {
        'arguments': {
            min: 1,
            type: ['string']
        },
    },
    'callback': (client, message, arguments) => {
        const problem = arguments.join(' ')

        calculate(problem).then(solution => {
            let answer = `Problem given: \n\`${problem}\`\n\n`
            answer += `Solution calculated: \n\`${solution}\``

            sendTextEmbed(message, 'problem solver', answer)
        }).catch(err => {
            message.reply(`Could not solve your problem: ${err.message}`)
        })
    }
}

