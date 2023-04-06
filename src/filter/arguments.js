const {arg} = require("mathjs");


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

        switch (desiredType) {
            case 'number':
                if (isNaN(argument))
                    return false
                break

            case 'positive-number':
                if (isNaN(argument) || parseInt(argument) < 0)
                    return false
                break
        }

    }
    return true
}

module.exports = {
    typesAreOkay,
    lengthIsOkay
}