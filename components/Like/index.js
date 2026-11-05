import Heart from "components/Icons/Heart"
import { toggleLike } from "lib/demoStore"
import { colors } from "styles/theme"

export default function Like({ likesCount, alreadyLiked, id }) {
  const handleLikeClick = (e) => {
    e.stopPropagation()
    toggleLike(id)
  }

  return (
    <>
      <button
        className={alreadyLiked ? "likes liked" : "likes"}
        onClick={handleLikeClick}
        aria-pressed={alreadyLiked}
        aria-label={alreadyLiked ? "Quitar me gusta" : "Me gusta"}
      >
        <Heart
          width={26}
          height={26}
          stroke={colors.secondary}
          fill={alreadyLiked ? colors.primary : "transparent"}
        />
        <span>{likesCount}</span>
      </button>
      <style jsx>{`
        .likes {
          align-items: center;
          background: transparent;
          border: 0;
          border-radius: 999px;
          color: #6b6b7b;
          cursor: pointer;
          display: flex;
          font-size: 14px;
          gap: 2px;
          padding: 2px 10px 2px 4px;
        }
        .likes:hover {
          background: ${colors.primary}14;
          color: ${colors.primary};
        }
        .liked {
          color: ${colors.primary};
        }
        .liked > :global(svg) {
          animation: pop 0.3s ease-out;
        }
        @keyframes pop {
          50% {
            transform: scale(1.3);
          }
        }
      `}</style>
    </>
  )
}
