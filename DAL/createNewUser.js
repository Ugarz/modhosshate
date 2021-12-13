const {
  getDatabase,
  ref,
  set,
  serverTimestamp,
} = require("firebase/database");

const db = getDatabase();

function createNewUser(channelName){
  set(ref(db, `streamers/${channelName}`), { date: serverTimestamp() })
  .catch(error => console.log("Error while writing in database", error));
}

module.exports = createNewUser;
