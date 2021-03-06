import { useEffect, useState } from "react"
import Adrit from "components/Adrit"
import s from "styles/HomePage.module.css"
import useUser from "hooks/useUser"
import { listenLatestAdrits } from "firebase/client"
import Head from "next/head"
import NavigationBar from "components/NavigationBar"
import Header from "components/Header"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestAdrits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Home | Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>

      <Header>Inicio</Header>

      <section className={s.section}>
        {timeline.map(
          ({
            id,
            userName,
            avatar,
            content,
            img,
            userId,
            createdAt,
            likesCount,
            alreadyLiked,
          }) => (
            <Adrit
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              img={img}
              key={id}
              content={content}
              userName={userName}
              userId={userId}
              likesCount={likesCount}
              alreadyLiked={alreadyLiked}
            />
          )
        )}
      </section>

      <NavigationBar inHome={true} inProfile={false} />

      <style jsx>{`
        button {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 999px;
          border: 0;
          color: #fff;
          font-size: 24px;
          height: 32px;
          position: absolute;
          right: 15px;
          top: 15px;
          width: 32px;
        }
      `}</style>
    </>
  )
}
