import { useState } from 'react'
import { Link } from 'react-router-dom'
import { imageUrl } from './types'
import type { Artwork } from './types'

interface Props {
  artworks: Artwork[]
}

function GalleryView({ artworks }: Props) {
  const [selected, setSelected] = useState<string[]>([])

  const departments: string[] = []
  artworks.forEach((item) => {
    if (item.department_title && !departments.includes(item.department_title)) {
      departments.push(item.department_title)
    }
  })

  function toggleDepartment(dept: string) {
    if (selected.includes(dept)) {
      setSelected(selected.filter((d) => d !== dept))
    } else {
      setSelected([...selected, dept])
    }
  }

  let shown = artworks
  if (selected.length > 0) {
    shown = artworks.filter(
      (item) => item.department_title && selected.includes(item.department_title)
    )
  }

  return (
    <div>
      <h1>Gallery</h1>
      <div className="filters">
        {departments.map((dept) => (
          <label key={dept}>
            <input
              type="checkbox"
              checked={selected.includes(dept)}
              onChange={() => toggleDepartment(dept)}
            />
            {dept}
          </label>
        ))}
      </div>

      <div className="gallery">
        {shown.map((item) => (
          <Link key={item.id} to={`/artwork/${item.id}`}>
            <img src={imageUrl(item.image_id!)} alt={item.title} referrerPolicy="no-referrer" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GalleryView