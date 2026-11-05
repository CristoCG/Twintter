import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { onAuthStateChanged } from "lib/demoStore"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser({ redirect = true } = {}) {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  useEffect(() => onAuthStateChanged(setUser), [])

  useEffect(() => {
    if (
      redirect &&
      user === USER_STATES.NOT_LOGGED &&
      router.pathname !== "/"
    ) {
      router.replace("/")
    }
  }, [user, redirect])

  return user
}
