import Adrit from "components/Adrit"
import Header from "components/Header"
import NavigationBar from "components/NavigationBar"
import Head from "next/head"
import { useRouter } from "next/router"
import s from "styles/HomePage.module.css"

export default function AdritPage(props) {
  const router = useRouter()

  if (router.isFallback) return <img src="/loading.gif" width={500}></img>
  return (
    <>
      <Head>
        <title>Twintt | Twintter🕊</title>
        <meta name="description" content="Creada con Next." />
        <link rel="icon" href="/origami_bird.ico" />
      </Head>

      <Header>Twintt</Header>

      <section className={s.section}>
        <Adrit
          avatar={props.avatar}
          createdAt={props.createdAt}
          id={props.id}
          img={props.img}
          key={props.id}
          content={props.content}
          userName={props.userName}
          userId={props.userId}
          likesCount={props.likesCount}
          alreadyLiked={props.alreadyLiked}
        />
      </section>

      <NavigationBar />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(
    `https://twintter.vercel.app/api/adrits/${id}`
  )
  console.log(apiResponse)

  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: "/home" }).end()
  }
}
