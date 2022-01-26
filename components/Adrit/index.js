import Avatar from "components/Avatar"
import styles from "styles/Adrit.module.css"

export default function Adrit({ avatar, userName, content, id, createdAt }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section className={styles.section}>
          <header>
            <strong>{userName}</strong>
            <span>🔘</span>
            <date className={styles.date}>
              <em>{createdAt}</em>
            </date>
          </header>
          <p className={styles.p}>{content}</p>
        </section>
      </article>
    </>
  )
}
