import Home from "components/Icons/Home"
import Write from "components/Icons/Write"
import Link from "next/link"
import s from "styles/NavBar.module.css"

export default function NavigationBar() {
  return (
    <>
      <nav className={s.nav}>
        <Link href="/home">
          <a className={s.a}>
            <Home width={40} height={40} stroke="#BC00FF" />
          </a>
        </Link>

        <Link href="/compose/tweet">
          <a className={s.a}>
            <Write width={40} height={40} stroke="#BC00FF" />
          </a>
        </Link>
      </nav>
    </>
  )
}
