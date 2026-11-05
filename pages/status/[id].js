import { useEffect, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import Header from "components/Header"
import NavigationBar from "components/NavigationBar"
import Twintt from "components/Twintt"
import useUser from "hooks/useUser"
import { listenTwintt } from "lib/demoStore"
import s from "styles/HomePage.module.css"

export default function TwinttPage() {
  const router = useRouter()
  const user = useUser()
  const { id } = router.query
  // undefined = cargando, null = no existe
  const [twintt, setTwintt] = useState(undefined)

  useEffect(() => {
    if (user && id) return listenTwintt(id, setTwintt)
  }, [user, id])

  return (
    <>
      <Head>
        <title>Twintt | Twintter🕊</title>
      </Head>

      <Header>Twintt</Header>

      <section className={s.section}>
        {twintt === undefined && <p className={s.empty}>Cargando…</p>}
        {twintt === null && (
          <div className={s.empty}>
            Este twintt no existe o fue borrado.{" "}
            <Link href="/home">Volver al inicio</Link>
          </div>
        )}
        {twintt && (
          <Twintt {...twintt} onDeleted={() => router.replace("/home")} />
        )}
      </section>

      <NavigationBar />
    </>
  )
}
