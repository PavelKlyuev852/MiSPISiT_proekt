import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PostCreate = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [tagsInput, setTagsInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!title || !body) {
      setError('Заголовок и текст обязательны')
      setLoading(false)
      return
    }

    try {
      const dataToSend = {
        title: title,
        body: body,
        is_published: isPublished,
        tags_input: tagsInput
      }

      // Добавляем author ID если пользователь авторизован
      if (user && user.id) {
        dataToSend.author = user.id
      }

      console.log('Отправка данных:', dataToSend)

      const response = await fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend)
      })

      console.log('Статус ответа:', response.status)

      const data = await response.json()
      console.log('Ответ сервера:', data)

      if (response.ok) {
        alert('Пост успешно создан!')
        navigate('/blog')
      } else {
        setError('Ошибка: ' + JSON.stringify(data))
        alert('Не удалось создать пост: ' + JSON.stringify(data))
      }
    } catch (error) {
      console.error('Error creating post:', error)
      setError('Ошибка соединения с сервером')
      alert('Не удалось создать пост. Проверьте консоль (F12).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4">
      <h2>Новый пост</h2>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Заголовок</label>
          <input
            className="form-control"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Текст</label>
          <textarea
            className="form-control"
            rows="10"
            placeholder="Текст"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Теги через запятую</label>
          <input
            className="form-control"
            placeholder="Теги через запятую"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="publishCheck"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="publishCheck">
            Опубликовать
          </label>
        </div>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Сохранение...' : 'СОХРАНИТЬ'}
        </button>
      </form>
    </div>
  )
}

export default PostCreate