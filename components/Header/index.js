import s from "styles/HomePage.module.css"

export default function Header({ children, right }) {
  return (
    <header className={s.header}>
      <h2 className={s.h2}>{children}</h2>
      <div className={s.headerRight}>
        {right}
        <span
          className={s.demoBadge}
          title="Los datos se guardan solo en tu navegador"
        >
          DEMO
        </span>
      </div>
    </header>
  )
}
