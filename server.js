require('dotenv').config();
const tmi = require('tmi.js');
const DAL = require('./DAL')
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
  console.log('on message', tags)

  // Ignore echoed messages.
  if(self) return;

  const bannedUserInfos = {
    displayName: tags['display-name'],
    username: tags.username,
    firstMsg: tags['first-msg'],
    mod: tags.mod,
    subscriber: tags.subscriber,
    userId: tags['user-id'],
    messageType: tags['message-type'],
    message,
    onChannel: channel
  }

  console.log("bannedUserInfos", bannedUserInfos)

  const { "display-name": dispayName } = tags;

  if (dispayName.match(/(h[0|o]s+)|(h[0|o]s[0|o]s+)/gm)) {
    console.log('== its hoss')
    const reason = "Begone IP grabbing bot, pew pew pew"
    // ban users
    client.ban(TWITCH_BOT_USERNAME, dispayName, reason)
      .then(res => console.log(`Banned ${dispayName}`))
      .catch(err => console.warn(`Error banning ${dispayName}: ${err}`))
      //TODO: Store identity
      DAL.create(bannedUserInfos)
  }

});

