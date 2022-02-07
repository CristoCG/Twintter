import Avatar from "components/Avatar"
import Like from "components/Like"

import useDateTimeFormat from "hooks/useDateTimeFormat"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import router from "next/router"

export default function Adrit({
  avatar,
  userName,
  content,
  img,
  id,
  createdAt,
  likesCount,
  alreadyLiked,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article>
        <div className="avatar">
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <div className="info">
              <strong>{userName}</strong>
              <span> · </span>
              <Link href={`/status/[${id}]`}>
                <a>
                  <time title={createdAtFormated}>{timeago}</time>
                </a>
              </Link>
            </div>
            <Like likesCount={likesCount} id={id} alreadyLiked={alreadyLiked} />
          </header>
          <div onClick={handleArticleClick}>
            <p>{content}</p>
            {img && <img src={img} />}
          </div>
        </section>
      </article>

      <style jsx>{`
        header {
          width: 100%;
          display: grid;
          align-items: center;
          grid-template-columns: repeat(2);
        }

        section {
          width: 100%;
        }
        article {
          border-bottom: 2px solid #eee;
          display: flex;
          padding: 10px 15px;
        }
        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }
        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }
        .avatar {
          padding-right: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
