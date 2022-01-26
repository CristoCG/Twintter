import Avatar from "components/Avatar"
import styles from "styles/Adrit.module.css"

export default function Adrit({ avatar, username, message, id }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar src={avatar} alt={username} />
        </div>
        <section className={styles.section}>
          <strong>{username}</strong>
          <p className={styles.p}>{message}</p>
        </section>
      </article>
    </>
  )
}
