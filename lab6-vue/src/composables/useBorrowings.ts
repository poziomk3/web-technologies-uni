import {
    createBorrowing,
    fetchBorrowing,
    fetchBorrowings,
    updateBorrowing,
  } from '@/api/borrowing'
  import type { Borrowing, BorrowingRequest } from '@/openapi/types'
  import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
  import type { Ref } from 'vue'
  
  export function useBorrowings(page: Ref<number>, pageSize: number) {
    return useQuery({
      queryKey: ['borrowings', page],
      queryFn: () => fetchBorrowings({ page: page.value, pageSize }),
    })
  }
  
  export function useBorrowing(id: number) {
    return useQuery({
      queryKey: ['borrowing', id],
      queryFn: () => fetchBorrowing(id),
      enabled: !!id,
      staleTime: 1000 * 60,
    })
  }
  
  export function useCreateBorrowing() {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (data: BorrowingRequest) => createBorrowing(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['borrowings'] })
      },
    })
  }
  
  export function useReturnBorrowing() {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (id: number) => updateBorrowing(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['borrowings'] })
      },
    })
  }
  