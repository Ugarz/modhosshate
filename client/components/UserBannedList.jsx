import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'

import {getData} from '../pages/api/twitch/banned'

const UserBannedList = () => {
  const {data: session, status} = useSession()
  const [bannedUsers, setBannedUsers] = useState([])
  console.log("session here", session)
  useEffect(() => {
    getData(session.token)
      .then(bannedUsers => {
        setBannedUsers(bannedUsers)
      })
      .catch(error => console.log('woops', error))
  }, [])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>
  }

  return (
    <>
      <div>
        <h2>Banned Users</h2>
        <ul>
          {bannedUsers.map(
            ({user_id, user_name, moderator_name, reason}, index) => {
              return (
                <li key={index}>
                  <p>
                    {user_name} a été ban par
                    {moderator_name}<br />
                    Raison: {reason}
                  </p>
                  <button>unban</button>
                </li>
              )
            }
          )}
        </ul>
      </div>
    </>
  )
}

export default UserBannedList
