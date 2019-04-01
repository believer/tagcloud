const express = require('express')
const app = express()
const port = 4000
const handler = require('./index')

app.get('/', handler)

app.listen(port, () => console.log(`Tagcloud API is running on ${port}!`))
