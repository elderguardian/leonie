module.exports = async (tags) => {
    const baseUrl = "https://igel.jaeger.website/"
    const apiUri = "liyuu.php"

    let response
    try {
        response = await fetch(baseUrl + apiUri)
    } catch {
        throw new Error('Could not fetch the liyuu api.')
    }

    const data = await response.json()

    if (!data.url) {
        throw new Error('Could not fetch an image from the api.')
    }

    return baseUrl + data.url;
}