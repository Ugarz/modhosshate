import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'

import styles from '../styles/Home.module.css'

const createNewUser = () => {
  const bannedUsers = `https://api.twitch.tv/helix/moderation/banned`
  const response = axios.get(url, {
    headers: {
      'Authorization': 'Bearer cfabdegwdoklmawdzdo98xt2fo512y',
      'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
    }
  })
  return true
}

export default function Home() {
  const { data: session } = useSession()
  if(session) {
    console.log("session:", session)
    return <>
      <p>
        <Image
          src={session?.user.image}
          alt="Picture of the author"
          width={30}
          height={30}
        /> Signed in as {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => createNewUser() }>Connect to Bot</button>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}