import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'

const PostList = () => {
  const { tagSlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { getPublishedPosts, getPostsByTag, searchPosts, tags, slugify } = useBlog()

  const [filteredPosts, setFilteredPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    let posts
    if (tagSlug) posts = getPostsByTag(tagSlug)
    else if (query) posts = searchPosts(query)
    else posts = getPublishedPosts()
    setFilteredPosts(posts)
    setCurrentPage(1)
  }, [tagSlug, query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) setSearchParams({ q: searchQuery })
    else setSearchParams({})
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  return (
    <div>
      <h2 className="mb-4">{tagSlug ? `Тег: ${tagSlug}` : query ? `Поиск: "${query}"` : 'Все посты'}</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="btn btn-primary" type="submit">Найти</button>
        </div>
      </form>
      {currentPosts.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {currentPosts.map(post => (
            <div className="col" key={post.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><Link to={`/${new Date(post.createdAt).getFullYear()}/${new Date(post.createdAt).getMonth() + 1}/${new Date(post.createdAt).getDate()}/${post.slug}`}>{post.title}</Link></h5>
                  <p className="card-text">{post.body.substring(0, 150)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : <p>Постов не найдено.</p>}

      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
export default PostList