import { useEffect, useState } from "react"
import {
  onAuthStateChanged,
  onNotification,
  startBotActivity,
} from "lib/demoStore"
import styles, { globalStyles } from "./styles"

export default function AppLayout({ children }) {
  const [toasts, setToasts] = useState([])
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => onAuthStateChanged((user) => setIsLogged(Boolean(user))), [])

  // Mientras hay alguien dentro de la demo, los usuarios de ejemplo
  // publican de vez en cuando para que el timeline se sienta vivo.
  useEffect(() => {
    if (isLogged) return startBotActivity()
  }, [isLogged])

  useEffect(
    () =>
      onNotification((message) => {
        const id = Math.random().toString(36).slice(2)
        setToasts((current) => [...current.slice(-2), { id, message }])
        setTimeout(() => {
          setToasts((current) => current.filter((t) => t.id !== id))
        }, 3500)
      }),
    []
  )

  return (
    <>
      <div className="layout">
        <main>
          {children}
          <div className="toasts" aria-live="polite">
            {toasts.map((toast) => (
              <p key={toast.id} className="toast">
                {toast.message}
              </p>
            ))}
          </div>
        </main>
      </div>
      <style jsx>{styles}</style>
      <style jsx global>
        {globalStyles}
      </style>
    </>
  )
}
