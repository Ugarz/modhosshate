// import { getSession } from "next-auth/react"
import { getToken } from "next-auth/jwt"
import axios from "axios";

const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async (req, res) => {
  console.log("API ENDPOINT")
  const body = JSON.parse(req.body);
  const { query } = body;

  // const session = await getSession({ req })
  const token = await getToken({ req, secret })

  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token.twitch.accessToken}`,
        'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
        "Accept": "json"
      },
      params: {
        broadcaster_id: "132041668"
      }
    }
    const results = await axios.get("https://api.twitch.tv/helix/moderation/banned", config)
    console.log("data from Twitch", results.data)
    return res.status(200).json({
      status: "Ok",
      data: results.data
    })
  } catch (error) {
    console.log("Error while searching for banned users", error)
    return res.status(400).json({
      status: error.message
    })
  }
}