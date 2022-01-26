import styles from "../styles/Home.module.css"
import Head from "next/head"
import Button from "../components/Button"
import { loginWithGitHub, onAuthStateChanged } from "../firebase/client"
import { useEffect, useState } from "react"

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

      <s className={styles.style}>
        <main className={styles.main}>
          <img src="/origami_bird.svg" width="120px" />
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
                  width="50px"
                />
                Login with GitHub
              </Button>
            ) : (
              user &&
              user.avatar && (
                <div className={styles.div}>
                  <img src={user.avatar} height={40} />
                  <strong>{user.username}</strong>
                </div>
              )
            )}
          </div>
        </main>
      </s>
    </div>
  )
}
