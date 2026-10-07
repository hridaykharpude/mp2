import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import type { Artwork } from './types'
import ListView from './ListView'
import GalleryView from './GalleryView'
import DetailView from './DetailView'
import './App.css'

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get<{ data: Artwork[] }>('https://api.artic.edu/api/v1/artworks', {
        params: {
          limit: 100,
          fields: 'id,title,artist_title,date_start,image_id,department_title,place_of_origin',
        },
      })
      .then((res) => {
        setArtworks(res.data.data.filter((a) => a.image_id))
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load artworks. Try again later.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">List</Link>
        <Link to="/gallery">Gallery</Link>
      </nav>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <Routes>
          <Route path="/" element={<ListView artworks={artworks} />} />
          <Route path="/gallery" element={<GalleryView artworks={artworks} />} />
          <Route path="/artwork/:id" element={<DetailView artworks={artworks} />} />
        </Routes>
      )}
    </div>
  )
}

export default App