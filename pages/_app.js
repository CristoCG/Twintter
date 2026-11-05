import Head from "next/head"
import AppLayout from "components/AppLayout"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
