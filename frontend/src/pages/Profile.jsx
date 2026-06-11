import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user } = useAuth()
  if (!user) return <div>Войдите в систему</div>

  return (
    <div>
      <h2>Профиль {user.username}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>О себе:</strong> {user.profile?.bio || 'Не указано'}</p>
      <Link to="/profile/edit" className="btn btn-secondary">Редактировать</Link>
    </div>
  )
}
export default Profile