import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"

import Avatar from "components/Avatar"
import Dropdown from "components/Dropdown"
import Header from "components/Header"
import NavigationBar from "components/NavigationBar"
import Timeline from "components/Timeline"
import useUser from "hooks/useUser"
import { listenUserTwintts } from "lib/demoStore"
import s from "styles/Profile.module.css"

export default function Profile() {
  const [timeline, setTimeline] = useState(null)
  const user = useUser()

  useEffect(() => {
    if (user) return listenUserTwintts(user.uid, setTimeline)
  }, [user])

  const likesReceived = (timeline || []).reduce(
    (sum, t) => sum + t.likesCount,
    0
  )

  return (
    <>
      <Head>
        <title>Perfil | Twintter🕊</title>
      </Head>

      <section className={s.main}>
        {user && (
          <>
            <Avatar
              alt={user.username}
              src={user.avatar}
              color={user.color}
              size={120}
            />
            <p className={s.userName}>{user.username}</p>
            <p className={s.handle}>@{user.handle}</p>
            {user.bio && <p className={s.bio}>{user.bio}</p>}
            <div className={s.stats}>
              <span>
                <strong>{timeline ? timeline.length : "–"}</strong> twintts
              </span>
              <span>
                <strong>{timeline ? likesReceived : "–"}</strong> likes
                recibidos
              </span>
            </div>
          </>
        )}
        <Dropdown />
      </section>

      <Header>Tus twintts</Header>

      <Timeline
        twintts={timeline}
        empty={
          <>
            Todavía no has twinteado nada.{" "}
            <Link href="/compose/tweet">Escribe tu primer twintt</Link>
          </>
        }
      />

      <NavigationBar active="profile" />
    </>
  )
}
