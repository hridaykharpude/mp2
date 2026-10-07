import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Artwork } from './types'

interface Props {
  artworks: Artwork[]
}

function ListView({ artworks }: Props) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('title')
  const [order, setOrder] = useState('asc')

  const filtered = artworks.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = filtered.sort((first, second) => {
    let result = 0
    if (sortBy === 'title') {
      result = first.title.localeCompare(second.title)
    } else {
      result = (first.date_start || 0) - (second.date_start || 0)
    }
    if (order === 'asc') {
      return result
    } else {
      return -result
    }
  })

  return (
    <div>
      <h1>Artwork List</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="title">Title</option>
        <option value="date_start">Year</option>
      </select>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <ul className="list">
        {sorted.map((item) => (
          <li key={item.id}>
            <Link to={`/artwork/${item.id}`}>
              {item.title} ({item.date_start || 'unknown'})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListView