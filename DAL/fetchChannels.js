const {
  getDatabase,
  ref,
  child,
  get
} = require("firebase/database");

const db = getDatabase();

function fetchChannels(){
  const dbRef = ref(db);
  return get(child(dbRef, `streamers/`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log("Could not find any streamers to link the bot");
    }
  }).catch((error) => {
    console.error(error);
  });
}

module.exports = fetchChannels;
