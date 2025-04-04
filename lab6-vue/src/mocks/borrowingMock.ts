import type { Borrowing, BorrowingRequest, PaginatedBorrowings } from '@/openapi/types'

// In-memory mock list
let MOCK_BORROWINGS: Borrowing[] = [
  {
    id: 1,
    id_book: 1,
    borrow_date: '2024-03-01',
    return_date: '2024-03-15',
    status: 'returned',
  },
  {
    id: 2,
    id_book: 2,
    borrow_date: '2024-03-20',
    return_date: '',
    status: 'borrowed',
  },
]

export function mockFetchBorrowings(page: number, pageSize: number): PaginatedBorrowings {
  const start = (page - 1) * pageSize
  const paginated = MOCK_BORROWINGS.slice(start, start + pageSize)
  return {
    items: paginated,
    total: MOCK_BORROWINGS.length,
  }
}

export function mockFetchBorrowing(id: number): Borrowing {
  const borrowing = MOCK_BORROWINGS.find((b) => b.id === id)
  if (!borrowing) {
    throw new Error('Borrowing not found')
  }
  return borrowing
}

export function mockCreateBorrowing(data: BorrowingRequest): Borrowing {
  const newBorrowing: Borrowing = {
    id: Date.now(),
    id_book: data.id_book,
    borrow_date: new Date().toISOString().slice(0, 10),
    return_date: '',
    status: 'borrowed',
  }
  MOCK_BORROWINGS.push(newBorrowing)
  return newBorrowing
}

export function mockUpdateBorrowing(id: number): Borrowing {
  const index = MOCK_BORROWINGS.findIndex((b) => b.id === id)
  if (index === -1) {
    throw new Error('Borrowing not found')
  }

  const updated: Borrowing = {
    ...MOCK_BORROWINGS[index],
    return_date: new Date().toISOString().slice(0, 10),
    status: 'returned',
  }

  MOCK_BORROWINGS[index] = updated
  return updated
}
