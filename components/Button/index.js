import styles from "../../styles/Home.module.css"
export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick} className={styles.btnGit}>
        {children}
      </button>
    </>
  )
}
