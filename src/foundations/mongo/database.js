const mongoClient = require('mongodb').MongoClient

let db

const init = (mongoURL, callback) => {
    mongoClient.connect(mongoURL)
        .then(client => {
            db = client
            callback(db, null)
        }).catch(err => {
            callback(null, err)
        })
}

const getDb = () => db

module.exports = {
    init,
    getDb,
}