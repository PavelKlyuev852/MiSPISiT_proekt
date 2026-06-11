import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { useAuth } from '../context/AuthContext'

const PostDetail = () => {
  const { year, month, day, slug } = useParams()
  const { user } = useAuth()
  const { posts, getPostComments, addComment } = useBlog()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    const foundPost = posts.find(p => p.slug === slug && p.isPublished)
    if (foundPost) {
      setPost(foundPost)
      setComments(getPostComments(foundPost.id))
    }
  }, [slug, posts])

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim() || !user) return
    addComment(post.id, user, commentText)
    setComments(getPostComments(post.id))
    setCommentText('')
  }

  if (!post) return <div>Пост не найден</div>

  return (
    <div>
      <article className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <div className="card-text mt-3" style={{ whiteSpace: 'pre-wrap' }}>{post.body}</div>
        </div>
      </article>
      {user && user.id === post.author?.id && (
        <div className="mb-4">
          <Link to={`/${year}/${month}/${day}/${slug}/edit`} className="btn btn-secondary btn-sm me-2">Редактировать</Link>
          <Link to={`/${year}/${month}/${day}/${slug}/delete`} className="btn btn-outline-danger btn-sm">Удалить</Link>
        </div>
      )}
      <h3>Комментарии</h3>
      {comments.map(c => (
        <div key={c.id} className="card mb-2"><div className="card-body"><strong>{c.author?.username}</strong>: {c.text}</div></div>
      ))}
      {user && (
        <form onSubmit={handleCommentSubmit} className="mt-3">
          <textarea className="form-control mb-2" rows="3" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Ваш комментарий..." />
          <button className="btn btn-primary">Отправить</button>
        </form>
      )}
    </div>
  )
}
export default PostDetail