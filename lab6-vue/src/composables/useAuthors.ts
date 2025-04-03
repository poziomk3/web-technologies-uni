import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { fetchAuthors, createAuthor, updateAuthor, deleteAuthor, fetchAuthor } from '@/api/authors'
import type { Ref } from 'vue'
import type { Author } from '@/openapi/types'

const QUERY_KEY = ['authors']

export function useAuthors(page: Ref<number>, pageSize: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, page],
    queryFn: () => fetchAuthors({ page: page.value, pageSize }),
    staleTime: 1000 * 60,
  })
}
export function useAuthor(id: number) {
  return useQuery({
    queryKey: ['author', id],
    queryFn: () => fetchAuthor(id),
    enabled: !!id,
    staleTime: 1000 * 60,
  })
}

export function useCreateAuthor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export function useUpdateAuthor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, author }: { id: number; author: Omit<Author, 'id'> }) =>
      updateAuthor(id, author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export function useDeleteAuthor() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}
