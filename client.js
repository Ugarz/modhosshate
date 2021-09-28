require('dotenv').config();
const tmi = require('tmi.js');

const {
  TWITCH_OAUTH_TOKEN,
  TWITCH_BOT_USERNAME,
	TWITCH_CHANNELS } = process.env;

const client = new tmi.Client({
	options: { debug: true },
  connection: {
    reconnect: true
  },
	identity: {
		username: TWITCH_BOT_USERNAME,
		password: TWITCH_OAUTH_TOKEN
	},
	channels: [ "Carbow" ]
});

client.connect();

module.exports = client;
