const app = require('../firebase')

const { getDatabase, ref, set } = require("firebase/database");
const db = getDatabase();

function writeBannedUserData(bannedUserInfos) {
  set(ref(db, 'banned/' + bannedUserInfos.userId), bannedUserInfos);
}

module.exports = {
  create: writeBannedUserData,
}