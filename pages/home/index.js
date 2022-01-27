import { useEffect, useState } from "react"
import Adrit from "components/Adrit"
import s from "styles/HomePage.module.css"
import useUser from "hooks/useUser"
import { fetchLatestAdrits } from "firebase/client"
import Link from "next/link"
import Write from "components/Icons/Write"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import Head from "next/head"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestAdrits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Home | Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>

      <header className={s.header}>
        <h2 className={s.h2}>Inicio</h2>
      </header>
      <section className={s.section}>
        {timeline.map(
          ({ id, userName, avatar, content, userId, createdAt }) => (
            <Adrit
              avatar={avatar}
              createdAt={createdAt}
              id={id}
              key={id}
              content={content}
              userName={userName}
              userId={userId}
            />
          )
        )}
      </section>
      <nav className={s.nav}>
        <Link href="/home">
          <a className={s.a}>
            <Home width={40} height={40} stroke="#BC00FF" />
          </a>
        </Link>
        <Link href="/search">
          <a className={s.a}>
            <Search width={40} height={40} stroke="#BC00FF" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a className={s.a}>
            <Write width={40} height={40} stroke="#BC00FF" />
          </a>
        </Link>
      </nav>
    </>
  )
}
