

const lengthIsOkay = (argumentConfig, arguments) =>  {
    const minArguments = argumentConfig.min ?? 0

    if (arguments.length < minArguments) {
        return false
    }

    const maxArguments = argumentConfig.max

    if (!maxArguments) {
        return true
    }

    return arguments.length < maxArguments;
}

const typesAreOkay = (argumentConfig, arguments) => {
    const filterTypes = argumentConfig.type ?? []

    if (filterTypes.length === 0) {
        return true
    }

    for (let i = 0; i < arguments.length; i++) {

        if (!filterTypes[i]) {
            continue
        }

        const argument = arguments[i]
        const desiredType = filterTypes[i]

        if (desiredType === 'number' && isNaN(argument)) {
            return false
        }
    }
    return true
}

module.exports = {
    typesAreOkay,
    lengthIsOkay
}