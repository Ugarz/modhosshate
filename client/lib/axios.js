import axios from "axios";

const twitchInstance = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

// twitchInstance.interceptors.request.use(
//   (response) => {
//     console.log('== intercept response ==')
//     return response;
//   },
//   async (error) => {
//     console.log('== intercept error response ==')
//     if (error.response) {
//       if (error.response.status === 401) {
//         // Do something, call refreshToken() request for example;
//         axios.post(`https://id.twitch.tv/oauth2/token
//         --data-urlencode
//         ?grant_type=refresh_token
//         &refresh_token=${}
//         &client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}
//         &client_secret=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET}
//     `)
//         // return a request
//         return twitchInstance(config);
//       }

//       if (error.response.status === ANOTHER_STATUS_CODE) {
//         // Do something
//         return Promise.reject(error.response.data);
//       }
//     }

//     return Promise.reject(error);
//   }
// )

export default twitchInstance