import Home from "components/Icons/Home"
import Profile from "components/Icons/Profile"
import Write from "components/Icons/Write"
import Link from "next/link"
import { colors } from "styles/theme"
import s from "styles/NavBar.module.css"

// `active` indica en qué sección estamos: "home", "compose" o "profile".
export default function NavigationBar({ active }) {
  const fill = (section) => (active === section ? "#D180FF" : "none")

  return (
    <nav className={s.nav}>
      <Link href="/home" className={s.a} aria-label="Inicio">
        <Home
          width={40}
          height={40}
          stroke={colors.secondary}
          fill={fill("home")}
        />
      </Link>
      <Link href="/compose/tweet" className={s.a} aria-label="Twintear">
        <Write
          width={40}
          height={40}
          stroke={colors.secondary}
          fill={fill("compose")}
        />
      </Link>
      <Link href="/profile" className={s.a} aria-label="Perfil">
        <Profile
          width={40}
          height={40}
          stroke={colors.secondary}
          fill={fill("profile")}
        />
      </Link>
    </nav>
  )
}
