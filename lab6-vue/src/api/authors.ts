import {
  mockCreateAuthor,
  mockDeleteAuthor,
  mockFetchAuthors,
  mockUpdateAuthor,
} from '@/mocks/authorsMock'
import type { Author, PaginatedAuthors } from '@/types/Authors'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function fetchAuthors(params: {
  page: number
  pageSize: number
}): Promise<PaginatedAuthors> {
  if (USE_MOCK) return Promise.resolve(mockFetchAuthors(params.page, params.pageSize))

  const res = await fetch(`${BACKEND_URL}/authors?page=${params.page}&pageSize=${params.pageSize}`)
  return res.json()
}

export async function fetchAuthor(id: number): Promise<Author> {
  if (USE_MOCK) {
    return Promise.resolve({
      id,
      name: 'Mockowy Autor',
      birthDate: '1970-01-01',
      biography: 'To tylko przykładowa biografia mockowego autora.',
    })
  }

  const res = await fetch(`${BACKEND_URL}/authors/${id}`)
  if (!res.ok) throw new Error('Nie udało się pobrać szczegółów autora')
  return res.json()
}

export async function createAuthor(author: Omit<Author, 'id'>) {
  if (USE_MOCK) return Promise.resolve(mockCreateAuthor(author))

  const res = await fetch(`${BACKEND_URL}/authors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author),
  })
  return res.json()
}

export async function updateAuthor(id: number, author: Omit<Author, 'id'>) {
  if (USE_MOCK) return Promise.resolve(mockUpdateAuthor(id, author))

  const res = await fetch(`${BACKEND_URL}/authors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author),
  })
  return res.json()
}

export async function deleteAuthor(id: number) {
  if (USE_MOCK) return Promise.resolve(mockDeleteAuthor(id))

  const res = await fetch(`${BACKEND_URL}/authors/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}
