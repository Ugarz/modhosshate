require('dotenv').config()

// Launch bot
require('./main')
const axios = require('axios')
const express = require('express')
const app = express()
const port = 3060


const {
  TWITCH_CLIENT_ID,
  TWITCH_CALLBACK_URL,
  TWITCH_CLIENT_SECRET
} = process.env;

app.get('/', (req, res) => {
  res.send('<a href="/auth">Auth</a>')
})

const url = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${TWITCH_CALLBACK_URL}&response_type=token&scope=moderation:read%20channel:moderate%20chat:edit%20chat:read%20whispers:read%20whispers:edit`
const url2 = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=moderation:read%20channel:moderate%20chat:edit%20chat:read%20whispers:read%20whispers:edit`

//TODO: Auth the bot
//TODO: Auth user Twitch
//TODO: Store accessToken
//TODO: Perform request with accessToken

app.get('/auth', (req, res) => {
  res.redirect(url)
})

app.get('/cb', function (req, res) {
  console.log('LOCATION', res)
  res.send('callback')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
