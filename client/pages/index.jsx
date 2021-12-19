import Head from 'next/head'
import Image from 'next/image'
import {useSession, signIn, signOut} from 'next-auth/react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import UserBannedList from '../components/UserBannedList'

import styles from '../styles/Home.module.css'

export default function Home() {
  const {data: session} = useSession()

  if (session) {
    return (
      <>
        <p>
          <Image
            src={session?.user.image}
            alt="Picture of the author"
            width={30}
            height={30}
          />{' '}
          Signed in as {session.user.name}
          <br />
          <span>({session.user.email})</span>
        </p>
        <button onClick={() => signOut()}>Sign out</button>
        <UserBannedList />
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
