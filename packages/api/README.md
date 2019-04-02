# Tagcloud API

Node Lambda function for getting the most used words in tweets from a hashtag.
Lambda is hosted on [Now](https://zeit.co/now).

**Example query:** [#bieber](https://tagcloud.willcodefor.beer/search?hashtag=bieber)

## Get started

To run the app for testing, a Twitter app key and secret need to be set as
environment variables.

```
$ TAGCLOUD_KEY=twitter-key TAGCLOUD_SECRET=twitter-secret npm run dev
```

`npm run dev` will start an Express server that hosts the handler on
`http://localhost:4000`. This is a convenience server for testing purposes.

## Run tests

```
$ npm test
```

Runs tests in watch mode in development and in single run mode when in CI.
