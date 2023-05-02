module.exports = async (tags) => {
    let response
    try {
        response = await fetch(`https://konachan.com/post.json?tags=${tags}`)
    } catch {
        throw new Error('Could not fetch the api.')
    }

    const data = await response.json()

    if (data.length < 1) {
        throw new Error('Could not find images for your query.')
    }

    const randomPost = data[Math.floor(Math.random() * data.length)]

    return randomPost.file_url;

}