import type { components } from './types/openapi'

export type Author = components['schemas']['AuthorDTO']
export type PaginatedAuthors = components['schemas']['PaginatedAuthorsDTO']

export type Book = components['schemas']['BookDTO']
export type PaginatedBooks = components['schemas']['PaginatedBooksDTO']

export type Borrowing = components['schemas']['BorrowingDTO']
export type PaginatedBorrowings = components['schemas']['PaginatedBorrowingsDTO']
export type BorrowingRequest = components['schemas']['BorrowingRequestDTO']
