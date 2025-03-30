export interface Author {
  id: number
  name: string
  biography?: string
  birthDate?: string
}
export interface PaginatedAuthors {
  items: Author[]
  total: number
}
