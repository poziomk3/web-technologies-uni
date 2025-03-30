export interface Book {
  id: number
  title: string
  authorId: string
  genre?: string
  description?: string
  coverImage?: string
  publicationDate?: string
  rating?: number
}

export interface PaginatedBooks {
  items: Book[]
  total: number
}
