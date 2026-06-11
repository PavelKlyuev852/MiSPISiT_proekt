import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProfileEdit = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [bio, setBio] = useState(user.profile?.bio || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUser({ ...user, profile: { ...user.profile, bio } })
    navigate('/profile')
  }

  return (
    <div>
      <h2>Редактировать профиль</h2>
      <form onSubmit={handleSubmit}>
        <textarea className="form-control mb-3" rows="4" placeholder="О себе" value={bio} onChange={(e) => setBio(e.target.value)} />
        <button className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  )
}
export default ProfileEdit