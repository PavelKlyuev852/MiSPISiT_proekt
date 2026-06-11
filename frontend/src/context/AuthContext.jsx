import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/current-user/', {
        method: 'GET',
        credentials: 'include'
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.log('User not authenticated')
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data)
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Ошибка входа' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Ошибка соединения с сервером' }
    }
  }

  const signup = async (username, email, password, password2) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password, password2 })
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data)
        return { success: true }
      } else {
        return { success: false, error: JSON.stringify(data) }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'Ошибка сервера' }
    }
  }

  const logout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
    setUser(null)
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}