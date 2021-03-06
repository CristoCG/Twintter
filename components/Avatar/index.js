import styles from "styles/avatar.module.css"

export default function Avatar({ alt, src, text }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={alt} src={src} title={alt} />
      {text && <strong>{alt}</strong>}
    </div>
  )
}
