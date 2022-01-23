
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Head from "next/head";


export default function Home() {
  return (
    <div>

      <Head>
        <title>Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>

      <main>
        <h1 className={styles.h1}>
          Welcome to{" "}
          <a className={styles.a} href="https://giffer-cristocg.vercel.app/">
            Twintter🕊
          </a>
        </h1>
        <nav className={styles.nav}>
          <Link href="/timeline">
            <a className={styles.a}>Timeline</a>
          </Link>
        </nav>
      </main>
    </div>
  );
}

