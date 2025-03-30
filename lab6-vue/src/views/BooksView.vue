<template>
  <div class="flex items-center justify-between mb-4">
    <h1 class="text-2xl font-semibold">Książki</h1>
    <button
      @click="openCreateModal"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      + Dodaj książkę
    </button>
  </div>

  <BookTable
    :books="books?.items ?? []"
    :total="books?.total ?? 0"
    :loading="isLoading"
    :page="page"
    :pageSize="pageSize"
    :authorsMap="authorsMap"
    @update:page="page = $event"
    @edit="editBook"
    @delete="removeBook"
    @view="viewDetails"
  />

  <BookDetails
    v-if="detailsBookId !== null"
    :key="detailsBookId"
    :book-id="detailsBookId"
    :authorsMap="authorsMap"
    @close="detailsBookId = null"
  />

  <BookForm
    v-if="showForm"
    :book-id="formBookId"
    @close="showForm = false"
    @submitted="onBookSaved"
  />

  <ConfirmDeleteModal
    v-model:show="showDeleteModal"
    :item-label="selectedBookToDelete?.title ?? ''"
    description="Tej operacji nie można cofnąć."
    @confirm="confirmDelete"
    @cancel="selectedBookToDelete = null"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Book } from '@/types/Books'
import { useBooks, useDeleteBook } from '@/composables/useBooks'
import { useAuthors } from '@/composables/useAuthors'

import BookTable from '@/components/books/BookTable.vue'
import BookForm from '@/components/books/BookForm.vue'
import BookDetails from '@/components/books/BookDetails.vue'
import ConfirmDeleteModal from '@/components/commons/ConfirmDeleteModal.vue'

const page = ref(1)
const pageSize = 10
const { data: books, isLoading, refetch } = useBooks(page, pageSize)
const { data: authorsData } = useAuthors(ref(1), 1000)

const authorsMap = computed(() =>
  Object.fromEntries((authorsData.value?.items ?? []).map((a) => [a.id, a.name])),
)

const showForm = ref(false)
const formBookId = ref<number | null>(null)
const openCreateModal = () => {
  formBookId.value = null
  showForm.value = true
}
const editBook = (book: Book) => {
  formBookId.value = book.id
  showForm.value = true
}
const onBookSaved = () => {
  showForm.value = false
  refetch()
}

const detailsBookId = ref<number | null>(null)
const viewDetails = (book: Book) => {
  if (detailsBookId.value === book.id) {
    detailsBookId.value = null
    setTimeout(() => (detailsBookId.value = book.id), 0)
  } else {
    detailsBookId.value = book.id
  }
}

const showDeleteModal = ref(false)
const selectedBookToDelete = ref<Book | null>(null)
const deleteMutation = useDeleteBook()

const removeBook = (book: Book) => {
  selectedBookToDelete.value = book
  showDeleteModal.value = true
}
const confirmDelete = () => {
  if (!selectedBookToDelete.value) return

  deleteMutation.mutate(selectedBookToDelete.value.id, {
    onSuccess: () => {
      showDeleteModal.value = false
      selectedBookToDelete.value = null
      refetch()
    },
  })
}
</script>
