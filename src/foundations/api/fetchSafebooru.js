const xml2js = require('xml2js')

module.exports = async (tags) => {
    let response
    try {
        response = await fetch(`https://safebooru.org/index.php?page=dapi&s=post&q=index&tags=${tags}`)
    } catch {
        throw new Error('Could not fetch the api.')
    }

    const data = await response.text()
    const parser = new xml2js.Parser({})

    const parsed = await parser.parseStringPromise(data).catch(err => {
        throw new Error('Could not parse the api result.')
    })

    const posts = parsed.posts.post

    if (!posts) {
        throw new Error('Could not find images for your query.')
    }

    return posts[Math.floor(Math.random() * posts.length)].$.file_url

}