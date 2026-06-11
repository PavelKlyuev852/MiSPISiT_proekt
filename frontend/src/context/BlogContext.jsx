import { createContext, useContext, useState, useEffect } from 'react'

const BlogContext = createContext()

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider')
  }
  return context
}

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  const API_URL = 'http://127.0.0.1:8000/api'

  // Загрузка постов из Django API
  useEffect(() => {
    fetch(`${API_URL}/posts/`)
      .then(res => {
        if (!res.ok) throw new Error('Network error')
        return res.json()
      })
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Ошибка загрузки постов:', err)
        setLoading(false)
      })
  }, [])

  // Загрузка тегов
  useEffect(() => {
    fetch(`${API_URL}/tags/`)
      .then(res => res.json())
      .then(data => setTags(data))
      .catch(err => console.error('Ошибка загрузки тегов:', err))
  }, [])

  const slugify = (text) => {
    const translit = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
      'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
      'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
      'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
      'э': 'e', 'ю': 'yu', 'я': 'ya'
    }

    return text
      .toLowerCase()
      .split('')
      .map(char => translit[char] || char)
      .join('')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const createPost = async (title, body, isPublished, author, tagsList = []) => {
    const postData = {
      title,
      body,
      is_published: isPublished,
      // Не отправляем author — Django сам его назначит
      tags_input: tagsList.join(', ')
    }

    console.log('Отправляю пост:', postData)

    try {
      const response = await fetch(`${API_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Ошибка сервера:', errorData)
        throw new Error(`HTTP ${response.status}: ${JSON.stringify(errorData)}`)
      }

      const newPost = await response.json()
      console.log('✅ Пост создан:', newPost)

      const updatedPosts = [newPost, ...posts]
      setPosts(updatedPosts)

      alert('Пост успешно создан!')
      return newPost
    } catch (error) {
      console.error('❌ Не удалось создать пост:', error)
      alert('Не удалось создать пост. Проверьте консоль.')
      throw error
    }
  }

  const updatePost = async (postId, updates) => {
    const response = await fetch(`${API_URL}/posts/${postId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    })

    const updatedPost = await response.json()
    setPosts(posts.map(p => p.id === postId ? updatedPost : p))
  }

  const deletePost = async (postId) => {
    await fetch(`${API_URL}/posts/${postId}/`, {
      method: 'DELETE'
    })
    setPosts(posts.filter(p => p.id !== postId))
  }

  const addComment = async (postId, author, text) => {
    const commentData = {
      post: postId,
      author: author?.id,
      text
    }

    const response = await fetch(`${API_URL}/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData)
    })

    const newComment = await response.json()
    setComments([...comments, newComment])
    return newComment
  }

  const getPostComments = (postId) => {
    return comments.filter(c => c.post === postId || c.post_id === postId)
  }

  const getPublishedPosts = () => posts

  const getPostsByTag = (tagSlug) => {
    return posts.filter(p => p.tags && p.tags.some(tag => tag.slug === tagSlug))
  }

  const searchPosts = (query) => {
    if (!query) return posts
    const lowerQuery = query.toLowerCase()
    return posts.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.body.toLowerCase().includes(lowerQuery)
    )
  }

  const getLatestPosts = (count = 5) => posts.slice(0, count)

  const getTotalPostsCount = () => posts.length

  if (loading) {
    return <div className="text-center p-5">Загрузка...</div>
  }

  return (
    <BlogContext.Provider value={{
      posts,
      comments,
      tags,
      createPost,
      updatePost,
      deletePost,
      addComment,
      getPostComments,
      getPublishedPosts,
      getPostsByTag,
      searchPosts,
      getLatestPosts,
      getTotalPostsCount,
      slugify
    }}>
      {children}
    </BlogContext.Provider>
  )
}