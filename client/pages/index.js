import Head from 'next/head'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'
import { useState, useEffect } from 'react'

import styles from '../styles/Home.module.css'

export default function Home() {
  const [bannedUsers, setBannedUsers] = useState()
  const { data: session } = useSession()

  async function handleOnSearchSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query');
    const results = await fetch ('/api/twitch/banned', {
      method: "POST",
      body: JSON.stringify({
        query
      })
    }).then(res => res.json())
    console.log("results", results.data)
    setBannedUsers(results.data)
  }

  if(session) {
    return <>
      <p>
        <Image
          src={session?.user.image}
          alt="Picture of the author"
          width={30}
          height={30}
        /> Signed in as {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
      <div>
        <form onSubmit={handleOnSearchSubmit}>
          <h2>Ban a User</h2>
          <input type="search" name="query" />
          <button>Search</button>
        </form>
        <div>
          <h2>Banned Users</h2>
          <ul>
            {bannedUsers && bannedUsers.data.map(({user_id, user_name, moderator_name, reason}, index) => {
              return (
                <li key={index}>
                  <p>{user_name} a été ban par{moderator_name} car {reason}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  }
  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}