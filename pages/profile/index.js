import Adrit from "components/Adrit"
import Dropdown from "components/Dropdown"
import Header from "components/Header"
import NavigationBar from "components/NavigationBar"
import { getProfile } from "firebase/client"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useEffect, useState } from "react"
import s from "styles/Profile.module.css"

export default function Profile() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = getProfile(setTimeline, user.uid)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])
  return (
    <>
      <Head>
        <title>Profile | Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>

      <main className={s.main}>
        {user && (
          <>
            <img src={user.avatar} className={s.img} />

            <p className={s.userName}>{user.username}</p>
          </>
        )}
        <Dropdown />
      </main>
      <Header>Tus Twintt&apos;s</Header>
      <section className={s.section}>
        {timeline.map(
          ({
            likesCount,
            createdAt,
            img,
            id,
            userName,
            avatar,
            content,
            userId,
            alreadyLiked,
          }) => (
            <Adrit
              avatar={avatar}
              content={content}
              createdAt={createdAt}
              likesCount={likesCount}
              id={id}
              img={img}
              key={id}
              userId={userId}
              userName={userName}
              alreadyLiked={alreadyLiked}
            />
          )
        )}
      </section>

      <NavigationBar inHome={false} inProfile={true} />
    </>
  )
}
