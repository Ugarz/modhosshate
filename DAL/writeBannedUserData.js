const {
  getDatabase,
  ref,
  set,
  increment,
  serverTimestamp
} = require("firebase/database");

const db = getDatabase();

function writeBannedUserData(client, userInfos) {

  //TODO: Set new user of bot (streamer)
  set(ref(db, `users/${(userInfos.onChannel).replaceAll("#","")}/${userInfos.fullUsername}`), {
    message: userInfos.message,
    date: userInfos.timestamp || serverTimestamp()
  })
  .catch(error => console.log("Error while writing in database", error));

  // TODO: Set Banned account
  set(ref(db, `banned/${userInfos.fullUsername}`), {
    onChannel: (userInfos.onChannel).replaceAll("#",""),
    lastBan: userInfos.timestamp || serverTimestamp(),
    count: increment(1)
  })
  .then(() => {
    client.say(userInfos.onChannel, `${userInfos.fullUsername} has been added to the users banned list.`)
  })
  .catch(error => console.log("Error while writing in database", error));
}

module.exports = writeBannedUserData;
