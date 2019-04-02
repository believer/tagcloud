const got = require('got')
const FormData = require('form-data')
const moment = require('moment')
const stopword = require('stopword')
const stemmer = require('stemmer')
const randomColor = require('randomcolor')

const TWITTER_BASE = 'https://api.twitter.com'
const KEY = process.env.TAGCLOUD_KEY
const SECRET = process.env.TAGCLOUD_SECRET

const REMOVE_WORDS = ['http', 'https', '&amp;']

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

// Remove any non-word characters
const cleanWord = word => word.replace(/[^a-zåäö0-9]*/g, '')

const removeUnwanted = word =>
  !REMOVE_WORDS.some(removeWord => word.includes(removeWord))

const removeShortWords = word => word.length > 3

const parseText = text =>
  // Remove any stopwords
  stopword.removeStopwords(
    text
      // Lowercase text to not get any differences in capitalization
      .toLowerCase()
      // Split by spaces to an array
      .split(' ')
      // Remove short words, links and more
      .filter(removeUnwanted)
      // Clean non-words and emojis
      .map(cleanWord)
      // Do stemming on word
      .map(stemmer)
      // Remove any short words
      .filter(removeShortWords)
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
        color: randomColor(),
        fontSize: `${Math.round(ratio * 42 + 18)}px`,
      },
    }
  })
}

module.exports = {
  getToken,
  getTweets,
}
