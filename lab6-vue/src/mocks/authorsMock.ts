import type { Author, PaginatedAuthors } from "@/openapi/types"

let MOCK_AUTHORS: Author[] = [
  { id: 1, name: 'Stanisław Lem', biography: 'Autor SF', birthDate: '1921-09-12' },
  { id: 2, name: 'Bolesław Prus', biography: 'Realizm i pozytywizm', birthDate: '1847-08-20' },
  { id: 3, name: 'Andrzej Sapkowski', biography: 'Wiedźmin', birthDate: '1948-06-21' },
]

export function mockFetchAuthors(page: number, pageSize: number): PaginatedAuthors {
  const start = (page - 1) * pageSize
  const paginated = MOCK_AUTHORS.slice(start, start + pageSize)
  return {
    items: paginated,
    total: MOCK_AUTHORS.length,
  }
}

export function mockCreateAuthor(author: Omit<Author, 'id'>): Author {
  const newAuthor: Author = { id: Date.now(), ...author }
  MOCK_AUTHORS.push(newAuthor)
  return newAuthor
}

export function mockUpdateAuthor(id: number, author: Omit<Author, 'id'>): Author {
  const index = MOCK_AUTHORS.findIndex((a) => a.id === id)
  if (index !== -1) {
    MOCK_AUTHORS[index] = { id, ...author }
  }
  return MOCK_AUTHORS[index]
}

export function mockDeleteAuthor(id: number): { success: true } {
  MOCK_AUTHORS = MOCK_AUTHORS.filter((a) => a.id !== id)
  return { success: true }
}
