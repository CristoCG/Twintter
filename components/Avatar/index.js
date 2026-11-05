import styles from "styles/avatar.module.css"

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "?"

export default function Avatar({
  alt,
  src,
  color = "#AB00FF",
  size = 49,
  text,
}) {
  return (
    <div className={styles.container}>
      {src ? (
        <img
          className={styles.avatar}
          alt={alt}
          src={src}
          title={alt}
          style={{ width: size, height: size }}
        />
      ) : (
        <span
          className={styles.initials}
          title={alt}
          aria-label={alt}
          style={{
            width: size,
            height: size,
            fontSize: size * 0.38,
            background: `linear-gradient(135deg, ${color}, ${color}99)`,
          }}
        >
          {getInitials(alt)}
        </span>
      )}
      {text && <strong>{alt}</strong>}
    </div>
  )
}
