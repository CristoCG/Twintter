import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/TimeLine.module.css";

export default function Timeline({ userName }) {
  return (
    <>
      <Head>
        <title>Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>
      <h1 className={styles.h1}>
        This is the timeline of{" "}
        <em>
          {" "}
          <user className={styles.user}>{userName}</user>
        </em>
      </h1>
      <Link href="/">
        <nav className={styles.nav}>
          <a className={styles.a}>Go home</a>
        </nav>
      </Link>
    </>
  );
}
export async function getStaticProps() {
  const userName = "Spike";
  return {
    props: {
      userName,
    },
  };
}
