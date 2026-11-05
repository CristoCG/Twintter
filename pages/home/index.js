import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"

import Header from "components/Header"
import NavigationBar from "components/NavigationBar"
import Timeline from "components/Timeline"
import useUser from "hooks/useUser"
import { listenLatestTwintts } from "lib/demoStore"

export default function HomePage() {
  const [timeline, setTimeline] = useState(null)
  const user = useUser()

  useEffect(() => {
    if (user) return listenLatestTwintts(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio | Twintter🕊</title>
      </Head>

      <Header>Inicio</Header>

      <Timeline
        twintts={timeline}
        empty={
          <>
            Aún no hay twintts.{" "}
            <Link href="/compose/tweet">¡Escribe el primero!</Link>
          </>
        }
      />

      <NavigationBar active="home" />
    </>
  )
}
