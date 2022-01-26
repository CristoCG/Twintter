import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Adrit from "components/Adrit"
import s from "styles/HomePage.module.css"
import useUser from "hooks/useUser"
import { fetchLatestAdrits } from "firebase/client"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestAdrits().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
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
        <nav className={s.nav}></nav>
      </AppLayout>
    </>
  )
}
