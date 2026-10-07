import { Link, useParams } from 'react-router-dom'
import { imageUrl } from './types'
import type { Artwork } from './types'

interface Props {
  artworks: Artwork[]
}

function DetailView({ artworks }: Props) {
  const { id } = useParams()
  const index = artworks.findIndex((a) => a.id === Number(id))

  if (index === -1) {
    return <p>Artwork not found.</p>
  }

  const artwork = artworks[index]
  const prev = artworks[(index - 1 + artworks.length) % artworks.length]
  const next = artworks[(index + 1) % artworks.length]

  return (
    <div className="detail">
      <div className="detail-buttons">
        <Link to={`/artwork/${prev.id}`}>&larr; Previous</Link>
        <Link to={`/artwork/${next.id}`}>Next &rarr;</Link>
      </div>

      <h1>{artwork.title}</h1>
      <img src={imageUrl(artwork.image_id!)} alt={artwork.title} referrerPolicy="no-referrer" />
      <p>Artist: {artwork.artist_title ?? 'Unknown'}</p>
      <p>Year: {artwork.date_start ?? 'Unknown'}</p>
      <p>Department: {artwork.department_title ?? 'Unknown'}</p>
      <p>Origin: {artwork.place_of_origin ?? 'Unknown'}</p>
    </div>
  )
}

export default DetailView