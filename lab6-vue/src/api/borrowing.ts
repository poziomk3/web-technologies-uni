import type { Borrowing, PaginatedBorrowings, BorrowingRequest } from '@/openapi/types'
import {
  mockFetchBorrowings,
  mockFetchBorrowing,
  mockCreateBorrowing,
  mockUpdateBorrowing,
} from '../mocks/borrowingMock'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export async function fetchBorrowings(params: {
  page: number
  pageSize: number
}): Promise<PaginatedBorrowings> {
  if (USE_MOCK) {
    return Promise.resolve(mockFetchBorrowings(params.page, params.pageSize))
  }

  const res = await fetch(
    `${BACKEND_URL}/borrowings?page=${params.page}&pageSize=${params.pageSize}`,
  )
  if (!res.ok) {
    throw new Error('Failed to fetch borrowings')
  }

  return res.json()
}

export async function fetchBorrowing(id: number): Promise<Borrowing> {
  if (USE_MOCK) {
    return Promise.resolve(mockFetchBorrowing(id))
  }

  const res = await fetch(`${BACKEND_URL}/borrowings/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch borrowing')
  }

  return res.json()
}

export async function createBorrowing(data: BorrowingRequest): Promise<Borrowing> {
  if (USE_MOCK) {
    return Promise.resolve(mockCreateBorrowing(data))
  }

  const res = await fetch(`${BACKEND_URL}/borrowings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('Failed to create borrowing')
  }

  return res.json()
}

export async function updateBorrowing(id: number): Promise<Borrowing> {
  if (USE_MOCK) {
    return Promise.resolve(mockUpdateBorrowing(id))
  }

  const res = await fetch(`${BACKEND_URL}/borrowings/${id}`, {
    method: 'PUT',
  })

  if (!res.ok) {
    throw new Error('Failed to update borrowing')
  }

  return res.json()
}
