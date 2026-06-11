import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Link className="navbar-brand" to="/">
          ✨ Мой Блог
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/blog">📰 Посты</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">ℹ️ О сайте</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/blog/create">✏️ Написать</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center gap-2">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-2" to="/profile">
                    {/* Аватарка */}
                    {user.profile?.avatar_url ? (
                      <img
                        src={user.profile.avatar_url}
                        alt={user.username}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #667eea'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span>👋 {user.username}</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                    🚪 Выйти
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">🔐 Вход</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/signup">
                    📝 Регистрация
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar