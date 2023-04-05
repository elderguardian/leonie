const {lengthIsOkay, typesAreOkay} = require("./arguments");

module.exports = (config, arguments) => {
    if (!config) {
        return true
    }

    const argumentConfig = config.arguments

    if (!argumentConfig) {
        return true
    }

    return lengthIsOkay(argumentConfig, arguments) && typesAreOkay(argumentConfig, arguments)
}