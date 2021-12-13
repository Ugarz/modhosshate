require('dotenv').config()
const axios = require('axios')

const {
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  TWITCH_REDIRECT_URI
} = process.env


function authClient(AUTORIZATION_CODE){
  console.log("== AUTORIZATION_CODE ==", AUTORIZATION_CODE)
  return axios.post(`https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&code=${AUTORIZATION_CODE}&grant_type=authorization_code&redirect_uri=${TWITCH_REDIRECT_URI}`)
    .then(response => {
      console.log("authClient", response.data)
      return response.data;
    })
    .catch(error => console.log(error))
}


const bearerPrefix = 'Bearer ';

function verifyAndDecode(header) {
  if (header.startsWith(bearerPrefix)) {
    try {
      const token = header.substring(bearerPrefix.length);
      return jsonwebtoken.verify(token, secret, { algorithms: ['HS256'] });
    }
    catch (e) {
      return console.log('Invalid JWT');
    }
  }
}

module.exports = {
  authClient,
  verifyAndDecode
};
