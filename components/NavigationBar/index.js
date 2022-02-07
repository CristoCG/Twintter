import Home from "components/Icons/Home"
import Profile from "components/Icons/Profile"
import Write from "components/Icons/Write"
import Link from "next/link"
import s from "styles/NavBar.module.css"

export default function NavigationBar({
  inHome = true,
  composeAdrit = true,
  inProfile = true,
}) {
  return (
    <>
      <nav className={s.nav}>
        {inHome ? (
          <Link href="/home">
            <a className={s.a}>
              <Home width={40} height={40} stroke="#BC00FF" fill="#D180FF" />
            </a>
          </Link>
        ) : (
          <Link href="/home">
            <a className={s.a}>
              <Home width={40} height={40} stroke="#BC00FF" fill="none" />
            </a>
          </Link>
        )}
        {composeAdrit ? (
          <Link href="/compose/tweet">
            <a className={s.a}>
              <Write width={40} height={40} stroke="#BC00FF" />
            </a>
          </Link>
        ) : null}

        {inProfile ? (
          <Link href="/profile">
            <a className={s.a}>
              <Profile width={40} height={40} stroke="#BC00FF" fill="#D180FF" />
            </a>
          </Link>
        ) : (
          <Link href="/profile">
            <a className={s.a}>
              <Profile width={40} height={40} stroke="#BC00FF" fill="none" />
            </a>
          </Link>
        )}
      </nav>
    </>
  )
}
