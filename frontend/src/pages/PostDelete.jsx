import { useParams, useNavigate, Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { useAuth } from '../context/AuthContext'

const PostDelete = () => {
  const { slug } = useParams()
  const { user } = useAuth()
  const { posts, deletePost } = useBlog()
  const navigate = useNavigate()
  const post = posts.find(p => p.slug === slug)

  const handleDelete = (e) => {
    e.preventDefault()
    deletePost(post.id)
    navigate('/blog')
  }

  if (!post) return <div>Пост не найден</div>

  return (
    <div>
      <h2>Удалить пост "{post.title}"?</h2>
      <form onSubmit={handleDelete}>
        <button className="btn btn-danger me-2">Да, удалить</button>
        <Link to="/blog" className="btn btn-secondary">Отмена</Link>
      </form>
    </div>
  )
}
export default PostDelete