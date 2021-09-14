require('dotenv').config();
const tmi = require('tmi.js');

// const flags = require('./flags.json')

const {
  TWITCH_OAUTH_TOKEN,
  TWITCH_BOT_USERNAME } = process.env;

const client = new tmi.Client({
	options: { debug: true },
  connection: {
    reconnect: true
  },
	identity: {
		username: TWITCH_BOT_USERNAME,
		password: TWITCH_OAUTH_TOKEN
	},
	channels: [ TWITCH_BOT_USERNAME ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
  console.log('on message')
	if(self) return;
  const { "display-name": dispayName } = tags;
  console.log("dispayName", dispayName)

  if (dispayName.match(/(h[0|o]s+)|(h[0|o]s[0|o]s+)/gm)) {
    console.log('== its hoss')
    // ban users
    client.ban(TWITCH_BOT_USERNAME, dispayName, 'Begone IP grabbing bot, pew pew pew')
      .then(res => console.log(`Banned ${dispayName}`))
      .catch(err => console.warn(`Error banning ${dispayName}: ${err}`))
  }
});