import styles from "styles/Home.module.css"

import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import Avatar from "components/Avatar"
import Button from "components/Button"
import Logo from "components/Icons/Logo"
import { getDemoUsers, loginAs, loginWithName } from "lib/demoStore"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const router = useRouter()
  const user = useUser()
  const [name, setName] = useState("")

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    loginWithName(name)
  }

  const personas = getDemoUsers().filter((u) => u.uid !== "u_bot")

  return (
    <>
      <Head>
        <title>Twintter🕊</title>
        <meta
          name="description"
          content="Demo interactiva de un clon de Twitter hecho con Next.js"
        />
      </Head>

      <section className={styles.hero}>
        <Logo width="100" />
        <h1 className={styles.h1}>Twintter🕊</h1>
        <h2 className={styles.h2}>
          Habla de desarrollo <br /> con otros devs 👨🏻‍💻👩🏻‍💻
        </h2>

        {user === USER_STATES.NOT_KNOWN && (
          <img src="/loading.gif" width={100} alt="Cargando" />
        )}

        {user === USER_STATES.NOT_LOGGED && (
          <>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="name" className={styles.label}>
                ¿Cómo te llamas?
              </label>
              <input
                id="name"
                className={styles.input}
                placeholder="Tu nombre"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <Button>Entrar a la demo</Button>
            </form>

            <p className={styles.or}>o entra como</p>
            <div className={styles.personas}>
              {personas.map((persona) => (
                <button
                  key={persona.uid}
                  className={styles.persona}
                  onClick={() => loginAs(persona.uid)}
                >
                  <Avatar
                    alt={persona.username}
                    color={persona.color}
                    size={32}
                  />
                  <span>{persona.username.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <p className={styles.note}>
              Demo sin servidor: tus twintts, likes y perfil se guardan solo en
              este navegador.
            </p>
          </>
        )}
      </section>
    </>
  )
}
