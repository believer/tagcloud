const { getTweets } = require('./services/twitter')
const url = require('url')

const validateQuery = path => {
  const query = url.parse(path || '', true).query

  if (!query.hashtag) {
    throw new Error('No "hashtag" provided')
  }

  return query
}

module.exports = async (req, res) => {
  try {
    const { hashtag } = validateQuery(req.url)
    const tweets = await getTweets(hashtag)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(tweets))
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: e.message }))
  }
}
