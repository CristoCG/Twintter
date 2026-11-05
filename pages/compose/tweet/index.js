import { useRef, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import Avatar from "components/Avatar"
import Button from "components/Button"
import Header from "components/Header"
import NavigationBar from "components/NavigationBar"
import useUser from "hooks/useUser"
import { addTwintt, MAX_TWINTT_LENGTH, readImage } from "lib/demoStore"
import { colors } from "styles/theme"
import s from "styles/ComposeTweet.module.css"

const COMPOSE_STATES = {
  IDLE: 0,
  LOADING: 1,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  NONE: 0,
  DRAG_OVER: 1,
  READING: 2,
}

export default function ComposeTweet() {
  const [twintt, setTwintt] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.IDLE)
  const [error, setError] = useState(null)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [imgURL, setImgURL] = useState(null)
  const fileInput = useRef(null)

  const user = useUser()
  const router = useRouter()

  const remaining = MAX_TWINTT_LENGTH - twintt.length

  const loadImage = (file) => {
    if (!file) return
    setError(null)
    setDrag(DRAG_IMAGE_STATES.READING)
    readImage(file)
      .then(setImgURL)
      .catch((err) => setError(err.message))
      .finally(() => setDrag(DRAG_IMAGE_STATES.NONE))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    setError(null)
    addTwintt({ content: twintt, img: imgURL })
      .then(() => router.push("/home"))
      .catch((err) => {
        setError(err.message)
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
    loadImage(e.dataTransfer.files[0])
  }

  const isButtonDisabled =
    (!twintt.trim().length && !imgURL) ||
    remaining < 0 ||
    status === COMPOSE_STATES.LOADING ||
    drag === DRAG_IMAGE_STATES.READING

  return (
    <>
      <Head>
        <title>Twintear | Twintter🕊</title>
      </Head>

      <Header>Nuevo twintt</Header>

      <section className={s.section}>
        <section className={s.formContainer}>
          {user && (
            <div className={s.avatarContainer}>
              <Avatar
                src={user.avatar}
                alt={user.username}
                color={user.color}
              />
            </div>
          )}
          <form className={s.form} onSubmit={handleSubmit}>
            <textarea
              autoFocus
              onChange={(e) => setTwintt(e.target.value)}
              onDragEnter={handleDragEnter}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={s.textarea}
              placeholder="¿Qué está pasando?"
              value={twintt}
            />

            {drag === DRAG_IMAGE_STATES.READING && (
              <p className={s.hint}>Cargando imagen…</p>
            )}

            {imgURL && (
              <div className={s.preview}>
                <button
                  type="button"
                  className={s.removeImage}
                  onClick={() => setImgURL(null)}
                  aria-label="Quitar imagen"
                >
                  ✕
                </button>
                <img src={imgURL} alt="Vista previa" />
              </div>
            )}

            {error && <p className={s.error}>{error}</p>}

            <div className={s.toolbar}>
              <button
                type="button"
                className={s.imageButton}
                onClick={() => fileInput.current.click()}
                title="Añadir imagen (también puedes arrastrarla al texto)"
              >
                🖼️ Imagen
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  loadImage(e.target.files[0])
                  e.target.value = ""
                }}
              />
              <div className={s.actions}>
                <span
                  className={s.counter}
                  style={{
                    color:
                      remaining < 0
                        ? "#e0245e"
                        : remaining < 20
                        ? "#ff8a00"
                        : "#8a8a99",
                  }}
                >
                  {remaining}
                </span>
                <Button disabled={isButtonDisabled}>
                  {status === COMPOSE_STATES.LOADING
                    ? "Twinteando…"
                    : "Twintear"}
                </Button>
              </div>
            </div>
          </form>
        </section>
      </section>

      <NavigationBar active="compose" />

      <style jsx>{`
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? `3px dashed ${colors.primary}`
            : "3px solid transparent"};
        }
      `}</style>
    </>
  )
}
