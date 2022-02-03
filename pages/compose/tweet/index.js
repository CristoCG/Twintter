import Avatar from "components/Avatar"
import Button from "components/Button"
import NavigationBar from "components/NavigationBar"
import { addAdrit, uploadImage } from "firebase/client"

import useUser from "hooks/useUser"
import Head from "next/head"
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import s from "styles/ComposeTweet.module.css"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 2,
  LOADING: 0,
  SUCCES: 1,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [adrit, setAdrit] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const user = useUser()
  const router = useRouter()

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])
  const handleChange = (event) => {
    const { value } = event.target
    setAdrit(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addAdrit({
      avatar: user.avatar,
      content: adrit,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    console.log()

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !adrit.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Adrittear | Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>
      <section className={s.section}>
        <section className={s.formContainer}>
          {user && (
            <section className={s.avatarContainer}>
              <Avatar src={user.avatar} />
            </section>
          )}
          <form className={s.form} onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={s.textarea}
              placeholder="¿Qué está pasando?"
              value={adrit}
            ></textarea>
            {imgURL && (
              <section>
                <button onClick={() => setImgURL(null)}>X</button>
                <img src={imgURL} />
              </section>
            )}
            <div className={s.div}>
              <Button disabled={isButtonDisabled}>Adrittear</Button>
            </div>
          </form>
        </section>
      </section>

      <NavigationBar composeAdrit={false} />

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
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        section {
          position: relative;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #6F0A83"
            : "3px solid transparent"};
        }
      `}</style>
    </>
  )
}
