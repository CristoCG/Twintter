import Avatar from "components/Avatar"
import Like from "components/Like"
import { deleteTwintt } from "lib/demoStore"

import useDateTimeFormat from "hooks/useDateTimeFormat"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Twintt({
  id,
  avatar,
  color,
  userName,
  handle,
  content,
  img,
  createdAt,
  likesCount,
  alreadyLiked,
  isMine,
  onDeleted,
}) {
  const router = useRouter()
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  const handleArticleClick = () => {
    if (router.asPath !== `/status/${id}`) router.push(`/status/${id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm("¿Borrar este twintt?")) {
      deleteTwintt(id)
      onDeleted && onDeleted()
    }
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div className="avatar">
          <Avatar src={avatar} alt={userName} color={color} />
        </div>
        <section>
          <header>
            <div className="info">
              <strong>{userName}</strong>
              {handle && <span className="handle"> @{handle}</span>}
              <span className="handle"> · </span>
              <Link href={`/status/${id}`} onClick={(e) => e.stopPropagation()}>
                <time title={createdAtFormated}>{timeago}</time>
              </Link>
            </div>
            {isMine && (
              <button
                className="delete"
                onClick={handleDelete}
                aria-label="Borrar twintt"
                title="Borrar twintt"
              >
                ✕
              </button>
            )}
          </header>
          {content && <p>{content}</p>}
          {img && <img src={img} alt="" />}
          <footer>
            <Like likesCount={likesCount} id={id} alreadyLiked={alreadyLiked} />
          </footer>
        </section>
      </article>

      <style jsx>{`
        header {
          align-items: center;
          display: flex;
          justify-content: space-between;
          gap: 8px;
        }
        .info {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .handle,
        .info :global(a) {
          color: #6b6b7b;
          font-size: 14px;
        }
        .info :global(a:hover) {
          text-decoration: underline;
        }
        section {
          min-width: 0;
          width: 100%;
        }
        article {
          border-bottom: 1px solid #eee;
          display: flex;
          padding: 12px 15px 6px;
          animation: appear 0.35s ease-out;
        }
        article:hover {
          background: #faf5ff;
          cursor: pointer;
        }
        img {
          border-radius: 12px;
          border: 1px solid #eee;
          height: auto;
          margin-top: 10px;
          max-height: 420px;
          object-fit: cover;
          width: 100%;
        }
        .avatar {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 4px 0 0;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }
        footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 4px;
        }
        .delete {
          background: transparent;
          border: 0;
          border-radius: 999px;
          color: #9a9aaa;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 14px;
          height: 28px;
          width: 28px;
        }
        .delete:hover {
          background: #ffe8ef;
          color: #e0245e;
        }
        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  )
}
