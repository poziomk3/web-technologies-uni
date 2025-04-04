<template>
  <div class="flex items-center justify-between mb-4">
    <h1 class="text-2xl font-semibold">Wypożyczenia</h1>
    <button
      @click="openCreateModal"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      + Wypożycz książkę
    </button>
  </div>

  <BorrowingTable
    :borrowings="borrowings?.items ?? []"
    :total="borrowings?.total ?? 0"
    :loading="isLoading"
    :page="page"
    :pageSize="pageSize"
    @update:page="page = $event"
    @return="returnBook"
  />

  <BorrowingForm v-if="showForm" @close="showForm = false" @submitted="onBorrowingCreated" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBorrowings, useCreateBorrowing, useReturnBorrowing } from '@/composables/useBorrowings'
import BorrowingTable from '@/components/borrowing/BorrowingTable.vue'
import BorrowingForm from '@/components/borrowing/BorrowingForm.vue'

const page = ref(1)
const pageSize = 5
const { data: borrowings, isLoading, refetch } = useBorrowings(page, pageSize)

const showForm = ref(false)
const openCreateModal = () => {
  showForm.value = true
}
const onBorrowingCreated = () => {
  showForm.value = false
  refetch()
}

const returnMutation = useReturnBorrowing()
const returnBook = (id: number) => {
  returnMutation.mutate(id, {
    onSettled: () => {
      refetch()
    },
  })
}
</script>
