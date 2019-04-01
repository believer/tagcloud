const got = require('got')
const FormData = require('form-data')
const moment = require('moment')
const stopword = require('stopword')

const TWITTER_BASE = 'https://api.twitter.com'
const KEY = process.env.TAGCLOUD_KEY
const SECRET = process.env.TAGCLOUD_SECRET

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

const parseText = text =>
  text
    .toLowerCase()
    .replace(/(\n|:|#|!|,|\.|…|-)/g, '')
    .split(' ')
    .filter(
      word =>
        word.length > 2 && !word.includes('https') && !word.includes('http')
    )

const getTweets = async hashtag => {
  const token = await getToken()
  const dateFormat = 'YYYYMMDD0000'
  const thirtyDaysAgo = moment()
    .subtract('30', 'days')
    .format(dateFormat)
  const today = moment().format(dateFormat)

  const { body } = await got.post(
    `${TWITTER_BASE}/1.1/tweets/search/30day/development.json`,
    {
      json: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        query: `#${hashtag}`,
        fromDate: thirtyDaysAgo,
        toDate: today,
      },
    }
  )

  const words = new Map()

  body.results
    .map(tweet => tweet.text)
    .forEach(text => {
      stopword.removeStopwords(parseText(text)).forEach(word => {
        const hasWord = words.get(word)

        if (hasWord == null) {
          words.set(word, 1)
        } else {
          words.set(word, hasWord + 1)
        }
      })
    })

  return Array.from(words)
    .slice(0, 100)
    .map(word => ({
      word: word[0],
      count: word[1],
    }))
}

module.exports = {
  getToken,
  getTweets,
}
