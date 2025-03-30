import { createBook, deleteBook, fetchBook, fetchBooks, updateBook } from '@/api/books'
import type { Book } from '@/types/Books'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export function useBooks(page: Ref<number>, pageSize: number) {
  return useQuery({
    queryKey: ['books', page],
    queryFn: () => fetchBooks({ page: page.value, pageSize }),
  })
}

export function useBook(id: number) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  })
}

export function useCreateBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['books'] })
    },
  })
}

export function useUpdateBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, book }: { id: number; book: Omit<Book, 'id'> }) => updateBook(id, book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })
}
