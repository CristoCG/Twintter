import s from "styles/HomePage.module.css"

export default function Header({ children }) {
  return (
    <>
      <header className={s.header}>
        <h2 className={s.h2}>{children}</h2>
      </header>
    </>
  )
}
