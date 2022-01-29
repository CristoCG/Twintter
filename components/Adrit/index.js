import Avatar from "components/Avatar"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import router from "next/router"
import styles from "styles/Adrit.module.css"

export default function Adrit({
  avatar,
  userName,
  content,
  img,
  id,
  createdAt,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick} className={styles.article}>
        <div className={styles.div}>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section className={styles.section}>
          <header>
            <strong>{userName}</strong>
            <span>🔘</span>
            <Link href={`status/${id}`}>
              <a className={styles.a}>
                <time title={createdAtFormated}>
                  <em>{timeago}</em>
                </time>
              </a>
            </Link>
          </header>
          <p className={styles.p}>{content}</p>
          {img && <img className={styles.img} src={img} />}
        </section>
      </article>
    </>
  )
}
