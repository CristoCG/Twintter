import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import styles from "styles/Adrit.module.css"

export default function Adrit({ avatar, userName, content, id, createdAt }) {
  const timeago = useTimeAgo(createdAt)
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
              <em>{timeago}</em>
            </date>
          </header>
          <p className={styles.p}>{content}</p>
        </section>
      </article>
    </>
  )
}
