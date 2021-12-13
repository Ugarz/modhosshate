require('dotenv').config();
const tmi = require('tmi.js');
const { fetchChannels } = require('./DAL')

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
		password: `oauth:${TWITCH_OAUTH_TOKEN}`
	}
});


fetchChannels()
	.then(twitchUsersChannels => client.opts.channels = Object.keys(twitchUsersChannels))
	.catch(error => console.log("Error while adding channels to watch", error))


client.connect();

module.exports = client;
