import type { Book, PaginatedBooks } from '@/openapi/types'
import { mockFetchBooks, mockCreateBook, mockUpdateBook, mockDeleteBook } from '../mocks/booksMock'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function fetchBooks(params: {
  page: number
  pageSize: number
}): Promise<PaginatedBooks> {
  console.log('essa')
  if (USE_MOCK) {
    return Promise.resolve(mockFetchBooks(params.page, params.pageSize))
  }

  const res = await fetch(`${BACKEND_URL}/books?page=${params.page}&pageSize=${params.pageSize}`)
  return res.json()
}

export async function fetchBook(id: number): Promise<Book> {
  if (USE_MOCK) {
    return Promise.resolve({
      id,
      title: 'Mockowa książka',
      authorId: '1',
      publicationDate: '2000-01-01',
      genre: 'Mock',
      rating: 4,
      description: 'To tylko mock.',
      coverImage: '',
    })
  }

  const res = await fetch(`${BACKEND_URL}/books/${id}`)
  if (!res.ok) throw new Error('Nie udało się pobrać szczegółów książki')
  return res.json()
}

export async function createBook(book: Omit<Book, 'id'>) {
  if (USE_MOCK) {
    return Promise.resolve(mockCreateBook(book))
  }

  const res = await fetch(`${BACKEND_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  })
  return res.json()
}

export async function updateBook(id: number, book: Omit<Book, 'id'>) {
  if (USE_MOCK) {
    return Promise.resolve(mockUpdateBook(id, book))
  }

  const res = await fetch(`${BACKEND_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  })
  return res.json()
}

export async function deleteBook(id: number) {
  if (USE_MOCK) {
    return Promise.resolve(mockDeleteBook(id))
  }

  const res = await fetch(`${BACKEND_URL}/books/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}
