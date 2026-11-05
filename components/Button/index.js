import styles from "styles/Home.module.css"

export default function Button({
  children,
  onClick,
  disabled,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles.btn}
    >
      {children}
    </button>
  )
}
