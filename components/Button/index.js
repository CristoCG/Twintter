import styles from '../../styles/Home.module.css'
export default function Button ({children, onClick}){
    return(
        <>
        <button onClick={onClick} className={styles.btnGit}>{children}</button>
        </>
    )
}