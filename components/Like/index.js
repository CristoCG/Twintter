import Heart from "components/Icons/Heart"
import { likeAdrit, unlikeAdrit } from "firebase/client"
import { colors } from "styles/theme"

export default function Like({ likesCount, alreadyLiked, id }) {
  const handleLikeClick = (e) => {
    e.preventDefault()
    if (alreadyLiked === false) {
      likeAdrit(id, likesCount)
        .then(() => {
          console.log("diste like")
        })
        .catch((e) => {
          console.log("No se pudo dar like ", e)
        })
    } else if (alreadyLiked === true) {
      unlikeAdrit(id, likesCount)
        .then(() => {
          console.log("quitaste el like")
        })
        .catch((e) => {
          console.log("No se pudo dar like ", e)
        })
    }
  }

  function likeIt(alreadyLiked) {
    if (alreadyLiked) {
      return "#AB00FF"
    }
    return "transparent"
  }

  return (
    <>
      <div className="likes" onClick={handleLikeClick}>
        <span>{likesCount} </span>
        <Heart
          width={28}
          height={28}
          stroke="#BC00FF"
          className="heart"
          fill={likeIt(alreadyLiked)}
        />
      </div>
      <style jsx>{`
        .likes {
          display: flex;
          padding: 0 0 0 5px;
          justify-self: end;
          align-items: center;
        }

        .likes:hover {
          background: radial-gradient(#0099ff22, transparent);
          background-size: 180px 180px;
          background-position: center;
        }
        .likes:hover > :global(svg) {
          stroke: ${colors.secondary};
        }
      `}</style>
    </>
  )
}
