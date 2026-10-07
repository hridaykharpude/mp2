export interface Artwork {
  id: number;
  title: string;
  artist_title: string | null;
  date_start: number | null;
  image_id: string | null;
  department_title: string | null;
  place_of_origin: string | null;
}

export function imageUrl(imageId: string): string {
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
}