import AppLayout from "components/AppLayout"
import Button from "components/Button"
import { addAdrit } from "firebase/client"

import useUser from "hooks/useUser"
import { useRouter } from "next/router"

import { useState } from "react"

import s from "styles/ComposeTweet.module.css"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 2,
  LOADING: 0,
  SUCCES: 1,
  ERROR: -1,
}

export default function ComposeTweet() {
  const user = useUser()
  const [adrit, setAdrit] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()

  const handleChange = (evt) => {
    const { value } = evt.target
    setAdrit(value)
  }

  const handleSubmit = () => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addAdrit({
      avatar: user.avatar,
      content: adrit,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !adrit.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            className={s.textarea}
            placeholder="¿Qué está pasando?"
            value={adrit}
          ></textarea>
          <div className={s.div}>
            <Button disabled={isButtonDisabled}>Adrittear</Button>
          </div>
        </form>
      </AppLayout>
    </>
  )
}
