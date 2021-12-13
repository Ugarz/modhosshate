const client = require('./client')
const DAL = require('./DAL')
const { panel } = require('./policies/flags.json')

client.on('message', (channel, tags, message, self) => {
  console.log('on message', tags)

  // Ignore echoed messages.
  if(self) return;

  const userInfos = {
    username: tags['display-name'],
    userId: tags['user-id'],
    fullUsername: `${tags['display-name']}-${tags['user-id']}`,
    messageType: tags['message-type'],
    message,
    onChannel: channel,
    timestamp : tags['tmi-sent-ts'],
  }

  console.log("userInfos", userInfos)

  const { "display-name": dispayName } = tags;

  if (dispayName.match(/(h[0|o]s+)|(h[0|o]s[0|o]s+)|(ho\d+ss)/gmi)
    || panel.includes(dispayName)) {
    console.log('== hoss detected')
    // ban users
    client.ban(channel, dispayName, "IP grabbing bot")
      .then(() => console.log(`Banned ${dispayName}`))
      .catch(err => console.warn(`Error banning ${dispayName}: ${err}`))
      //TODO: Store identity
      DAL.writeBannedUserData(client, userInfos)
  }

});

