import styles from "styles/Home.module.css"

import { useEffect } from "react"

import { loginWithGitHub } from "firebase/client"

import Head from "next/head"

import Button from "components/Button"
import Logo from "components/Icons/Logo"
import { useRouter } from "next/router"

import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
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

      <s className={styles.style}>
        <Logo width="100" />
        <h1 className={styles.h1}>Twintter🕊</h1>
        <h2 className={styles.h2}>
          Talk about developments <br /> with developers 👨🏻‍💻👩🏻‍💻
        </h2>

        <div className={styles.div}>
          {user === USER_STATES.NOT_LOGGED ? (
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
            user === USER_STATES.NOT_KNOWN && (
              <img src="/loading.gif" width={100}></img>
            )
          )}
        </div>
      </s>
    </div>
  )
}
