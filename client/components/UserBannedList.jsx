import banned, { getData } from "../pages/api/twitch/banned"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const UserBannedList = () => {
  const { data: session, status } = useSession()
  const [bannedUsers, setBannedUsers] = useState([])

  useEffect(() => {
    getData(session.token)
    .then(bannedUsers => {
      console.log("bannedUsers", bannedUsers)
      setBannedUsers(bannedUsers)
    })
    .catch(error => console.log('woops', error))
  }, [])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
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
                      {moderator_name} car {reason}
                    </p>
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