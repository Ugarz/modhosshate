import axios from 'axios'
import {getToken} from 'next-auth/jwt'

const secret = process.env.NEXT_PUBLIC_JWT_SECRET

export async function getData(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      Accept: 'json',
    },
    params: {
      broadcaster_id: '132041668',
    },
  }
  const bannedUsers = await axios.get(
    'https://api.twitch.tv/helix/moderation/banned',
    config
  )
  return bannedUsers.data.data
}

export async function banUser(token, broadcaster_id, moderator_id) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      Accept: 'json',
    },
    params: {
      broadcaster_id: '132041668',
      moderator_id: '132041668'
    },
  }
  const bannedUsers = await axios.post(
    'https://api.twitch.tv/helix/moderation/bans',
    {"data": [{"user_id":"726521669","duration":300,"reason":"no reason"}]}
  )
  return bannedUsers.data.data
}

export default async (req, res) => {
  const token = await getToken({req, secret})

  try {
    const bannedUsers = getData(token)
    return res.status(200).json({
      status: 'Ok',
      data: bannedUsers,
    })
  } catch (error) {
    console.log('Error while searching for banned users', error)
    return res.status(400).json({
      status: error.message,
    })
  }
}
