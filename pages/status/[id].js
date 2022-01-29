import Adrit from "components/Adrit"
import { firestore } from "firebase/admin"
import Head from "next/head"
import { useRouter } from "next/router"

export default function AdritPage(props) {
  const router = useRouter()

  if (router.isFallback) return <img src="/loading.gif" width={100}></img>

  return (
    <>
      <Head>
        <title>Adrit | Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>
      <Adrit {...props} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "2v6O59t32Pr9Kxt1cykC" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("Adrit")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}
