import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { useAuth } from '../context/AuthContext'

const PostEdit = () => {
  const { slug } = useParams()
  const { user } = useAuth()
  const { posts, updatePost } = useBlog()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  useEffect(() => {
    const post = posts.find(p => p.slug === slug)
    if (post) { setTitle(post.title); setBody(post.body); setIsPublished(post.isPublished) }
  }, [slug, posts])

  const handleSubmit = (e) => {
    e.preventDefault()
    const post = posts.find(p => p.slug === slug)
    updatePost(post.id, { title, body, isPublished })
    navigate('/blog')
  }

  return (
    <div>
      <h2>Редактировать пост</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="form-control mb-3" rows="10" value={body} onChange={(e) => setBody(e.target.value)} required />
        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
          <label className="form-check-label">Опубликовано</label>
        </div>
        <button className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  )
}
export default PostEdit