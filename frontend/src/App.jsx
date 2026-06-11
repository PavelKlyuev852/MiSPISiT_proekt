import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostList from './pages/PostList'
import PostDetail from './pages/PostDetail'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'
import PostDelete from './pages/PostDelete'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ProfileEdit from './pages/ProfileEdit'
import About from './pages/About'
import Navbar from './components/Navbar'

function App() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<PostList />} />
          <Route path="/tag/:tagSlug" element={<PostList />} />
          <Route path="/blog/create" element={<PostCreate />} />
          <Route path="/:year/:month/:day/:slug" element={<PostDetail />} />
          <Route path="/:year/:month/:day/:slug/edit" element={<PostEdit />} />
          <Route path="/:year/:month/:day/:slug/delete" element={<PostDelete />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/users/:username" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer>
  <div className="container text-center">
    <p className="mb-2">
      © {currentYear} <strong>Мой Блог</strong> — сделано с ❤️ на React + Django
    </p>
    <p className="mb-2">
      <a href="/about" style={{ color: '#667eea', margin: '0 10px' }}>О сайте</a>
      <span style={{ color: '#ccc' }}>|</span>
      <a href="/blog" style={{ color: '#667eea', margin: '0 10px' }}>Блог</a>
      <span style={{ color: '#ccc' }}>|</span>
      <a href="/login" style={{ color: '#667eea', margin: '0 10px' }}>Войти</a>
    </p>
    <p className="mb-0" style={{ fontSize: '0.85rem', color: '#999' }}>
      Клюев Павел, группа Д-Э341
    </p>
  </div>
</footer>
    </>
  )
}

export default App