require('dotenv').config()

// Launch bot
require('./main')
const express = require('express')
const client = require("./client")
const DAL = require( './DAL' )
const { authClient } = require( './twitch' )
const app = express()
const cors = require('cors')
const port = 3060

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/join', function (req, res) {
  //TODO: Store in DB the new user
  DAL.createNewUser(req.body.channel)
  //TODO: Bot join the channel
  return client.join(req.body.channel)
    .then(data => {
      console.log("BOT has joined the channel", data)
      client.say(req.body.channel, "Bot ready! 👋 please be sure to give me moderator grade.")
      return res.json({
        "status": 200,
        "message": "Bot has join the channel",
        "channel": req.body.channel
      })
    })
    .catch(error => console.log("Error while joing channel", error))
})

app.post('/part', function (req, res) {
  client.say(req.body.channel, "Hello You just asked me to leave? ok, take care 👌.")
  //TODO: Delete in DB the new user
  DAL.createNewUser(req.body.channel)
  //TODO: Bot part the channel
  client.part(req.body.channel)
    .then(data => {
      console.log("BOT leaving the channel", data)
      res.json({
        "status": 200,
        "message": "Bot has left the channel",
        "channel": req.body.channel
      })
    })
    .catch(error => console.log("Error while leaving the channel", error))
})

app.post('/auth', async function (req, res) {
  const response = await authClient(req.body.code)
  console.log("response", response)
})

app.post('/users', function (req, res) {
  //TODO: Store in DB the new user
  DAL.createNewUser(req.body.users)
  res.json({
    status: 200,
    message: "User created"
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
