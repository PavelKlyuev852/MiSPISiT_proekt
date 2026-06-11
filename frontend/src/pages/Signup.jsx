import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) { setError('Пароли не совпадают'); return }
    const res = signup(username, email, password)
    if (res.success) navigate('/blog')
    else setError(res.error)
  }

  return (
    <div className="col-md-6 mx-auto">
      <h2>Регистрация</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="form-control mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Повторите пароль" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
        <button className="btn btn-success">Зарегистрироваться</button>
      </form>
    </div>
  )
}
export default Signup