module.exports = delta => {
    const days = Math.floor(delta / 86400)
    delta -= days * 86400

    const hours = Math.floor(delta / 3600) % 24
    delta -= hours * 3600

    const minutes = Math.floor(delta / 60) % 60
    delta -= minutes * 60

    const seconds = delta % 60

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    }
}