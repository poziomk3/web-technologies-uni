import type { Book, PaginatedBooks } from '@/openapi/types'

let MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: 'Wiedźmin: Ostatnie życzenie',
    authorId: '1',
    genre: 'Fantasy',
    description: 'Zbiór opowiadań o Geralcie z Rivii.',
    coverImage: 'https://example.com/cover1.jpg',
    publicationDate: '1993-06-01',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Lalka',
    authorId: '2',
    genre: 'Powieść realistyczna',
    description: 'Powieść Bolesława Prusa o życiu warszawskiej elity.',
    coverImage: 'https://example.com/cover2.jpg',
    publicationDate: '1890-01-01',
    rating: 4.2,
  },
  {
    id: 3,
    title: 'Solaris',
    authorId: '3',
    genre: 'Science Fiction',
    description: 'Psychologiczna opowieść Stanisława Lema.',
    coverImage: 'https://example.com/cover3.jpg',
    publicationDate: '1961-05-20',
    rating: 4.5,
  },
]

export function mockFetchBooks(page: number, pageSize: number): PaginatedBooks {
  const start = (page - 1) * pageSize
  const paginated = MOCK_BOOKS.slice(start, start + pageSize)
  return {
    items: paginated,
    total: MOCK_BOOKS.length,
  }
}

export function mockCreateBook(book: Omit<Book, 'id'>): Book {
  const newBook: Book = {
    id: Date.now(),
    ...book,
  }
  MOCK_BOOKS.push(newBook)
  return newBook
}

export function mockUpdateBook(id: number, book: Omit<Book, 'id'>): Book {
  const index = MOCK_BOOKS.findIndex((b) => b.id === id)
  if (index !== -1) {
    MOCK_BOOKS[index] = { id, ...book }
  }
  return MOCK_BOOKS[index]
}

export function mockDeleteBook(id: number): { success: true } {
  MOCK_BOOKS = MOCK_BOOKS.filter((b) => b.id !== id)
  return { success: true }
}
