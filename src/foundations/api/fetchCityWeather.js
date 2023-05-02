module.exports = async cities => {
    let results = [];

    for (const city of cities) {
        const response = await fetch(`https://wttr.in/${city}?format=3`)

        if (response.status === 404) {
            throw new Error('The weather api could not find this city.')
        }

        if (!response.ok) {
            throw new Error('Something is wrong with the weather API response.')
        }

        results.push(await response.text())
    }

    return results;
}