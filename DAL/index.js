const app = require('../firebase')

const {
  getDatabase,
  ref,
  set,
  update,
  increment,
  serverTimestamp
} = require("firebase/database");

const db = getDatabase();

// https://github.com/firebase/snippets-web/blob/1e8f41c904d557f486cdab2a1401ec5f6033dc39/snippets/database-next/read-and-write/rtdb_social_star_increment.js
function addBan(userInfos) {
  const dbRef = ref(db);

  const updates = {};
  updates[`banned/${userInfos.username}-${userInfos.userId}/number`] = increment(1)
  update(dbRef, updates);
}

function writeBannedUserData(client, userInfos) {
  console.log("Add streamer user")
  set(ref(db, 'users/' + (userInfos.onChannel).replaceAll("#","") + `/${userInfos.username}-${userInfos.userId}`), {
    message: userInfos.message,
    date: userInfos.timestamp || serverTimestamp()
  })
  .then(() => console.log("J'ai créé une entrée en db"))
  .catch(error => console.log("Error while writing in database", error));

  console.log("Add a banned user")
  set(ref(db, 'banned/' + userInfos.username + `-${userInfos.userId}`), {
    onChannel: userInfos.onChannel
  })
  .then(() => {
    client.say(userInfos.onChannel, `J'ai ajouté son ${userInfos.username} au registre des gens à bannir.`)
    addBan(userInfos)
  })
  .catch(error => console.log("Error while writing in database", error));
}

module.exports = {
  create: writeBannedUserData
}