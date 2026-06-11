import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="hero">
        <h1>🎉 Добро пожаловать в Мой Блог!</h1>
        <p>
          Современная платформа для публикации статей. Делитесь мыслями,
          читайте интересное и находите единомышленников!
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/blog" className="btn btn-primary btn-lg">
            📚 Читать блог
          </Link>
          <Link to="/about" className="btn btn-outline-primary btn-lg">
            ℹ️ О проекте
          </Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
              <h5 className="card-title">Пишите статьи</h5>
              <p className="card-text">
                Создавайте качественные посты с тегами и делитесь знаниями с миром
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}></div>
              <h5 className="card-title">Обсуждайте</h5>
              <p className="card-text">
                Оставляйте комментарии и участвуйте в дискуссиях с другими читателями
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔖</div>
              <h5 className="card-title">Находите по темам</h5>
              <p className="card-text">
                Удобная система тегов поможет найти интересные материалы
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home