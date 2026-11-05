import Twintt from "components/Twintt"
import s from "styles/HomePage.module.css"

export default function Timeline({ twintts, empty }) {
  if (twintts === null) {
    return (
      <section className={s.section}>
        <p className={s.empty}>Cargando…</p>
      </section>
    )
  }

  return (
    <section className={s.section}>
      {twintts.length === 0 && <div className={s.empty}>{empty}</div>}
      {twintts.map((twintt) => (
        <Twintt key={twintt.id} {...twintt} />
      ))}
    </section>
  )
}
