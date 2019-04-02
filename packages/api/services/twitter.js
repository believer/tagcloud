const got = require('got')
const FormData = require('form-data')
const moment = require('moment')
const stopword = require('stopword')

const TWITTER_BASE = 'https://api.twitter.com'
const KEY = process.env.TAGCLOUD_KEY
const SECRET = process.env.TAGCLOUD_SECRET

// Gets an access token from the Twitter API
const getToken = async () => {
  const form = new FormData()

  form.append('grant_type', 'client_credentials')

  const { body } = await got.post(`${TWITTER_BASE}/oauth2/token`, {
    auth: `${KEY}:${SECRET}`,
    body: form,
  })

  const { access_token } = JSON.parse(body)

  return access_token
}

// Lowercase text to not get any differences in capitalization
// Remove some characters like !
// Split by spaces to an array
// Remove short words and links
// Remove any stopwords
const parseText = text =>
  stopword.removeStopwords(
    text
      .toLowerCase()
      .replace(/(\n|:|#|!|,|\.|…|-)/g, '')
      .split(' ')
      .filter(
        word =>
          word.length > 2 && !word.includes('https') && !word.includes('http')
      )
  )

const getTweets = async hashtag => {
  const token = await getToken()

  // Create a date string from thirty days ago (max in Twitter API)
  // and todays date
  const dateFormat = 'YYYYMMDD0000'
  const fromDate = moment()
    .subtract('30', 'days')
    .format(dateFormat)
  const toDate = moment().format(dateFormat)

  const { body } = await got.post(
    `${TWITTER_BASE}/1.1/tweets/search/30day/development.json`,
    {
      json: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        query: `#${hashtag}`,
        fromDate,
        toDate,
      },
    }
  )

  // Collect all the words in a map
  const words = new Map()

  body.results
    .map(tweet => tweet.text)
    .forEach(text => {
      parseText(text).forEach(word => {
        const hasWord = words.get(word)

        if (hasWord == null) {
          words.set(word, 1)
        } else {
          words.set(word, hasWord + 1)
        }
      })
    })

  // Get top 100
  const output = Array.from(words)
    .slice(0, 100)
    .map(word => ({
      word: word[0],
      count: word[1],
    }))

  // Get top score, slice array because sort is a mutating operation and we
  // don't want sorted results in output
  const sortByCount = output.slice().sort((a, b) => b.count - a.count)
  const topScore = sortByCount.length > 0 ? sortByCount[0].count : 0

  // Calculate styling and return output
  return output.map(word => {
    const ratio = word.count / topScore

    return {
      ...word,
      style: {
        color: `hsl(0, 0%, ${Math.abs(ratio * 50 - 50)}%)`,
        fontSize: `${(ratio * 48).toFixed(2)}px`,
      },
    }
  })
}

module.exports = {
  getToken,
  getTweets,
}
