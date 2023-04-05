const { evaluate } = require('mathjs')

module.exports = async problem => {
    try {
        return evaluate(problem)
    } catch(err) {
        throw new Error('Could not parse your problem.')
    }
}