import styles from "styles/Home.module.css"

import { useEffect, useState } from "react"

import { loginWithGitHub, onAuthStateChanged } from "firebase/client"

import Head from "next/head"

import Button from "components/Button"
import Avatar from "components/Avatar"
import Logo from "components/Icons/Logo"
import AppLayout from "components/AppLayout"

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Head>
        <title>Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>

      <AppLayout>
        <s className={styles.style}>
          <Logo width="100" />
          <h1 className={styles.h1}>Twintter🕊</h1>
          <h2 className={styles.h2}>
            Talk about developments <br /> with developers 👨🏻‍💻👩🏻‍💻
          </h2>

          <div className={styles.div}>
            {user === null ? (
              <Button onClick={handleClick}>
                <img
                  className={styles.imgGit}
                  src="github-logo_icon-icons.com_73546.svg"
                  width="24px"
                  height="24px"
                />
                Login with GitHub
              </Button>
            ) : (
              user &&
              user.avatar && (
                <div className={styles.div}>
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    text={user.username}
                  />
                </div>
              )
            )}
          </div>
        </s>
      </AppLayout>
    </div>
  )
}
