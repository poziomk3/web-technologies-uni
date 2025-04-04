<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-semibold">Autorzy</h1>
    <button
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      @click="openCreate"
    >
      + Dodaj autora
    </button>
  </div>

  <AuthorTable
    :authors="authors?.items ?? []"
    :total="authors?.total ?? 0"
    :loading="isLoading"
    :page="page"
    :pageSize="pageSize"
    @update:page="page = $event"
    @edit="editAuthor"
    @delete="removeAuthor"
    @view="viewAuthor"
  />

  <AuthorDetails
    v-if="detailsAuthorId !== null"
    :key="detailsAuthorId"
    :author-id="detailsAuthorId"
    @close="detailsAuthorId = null"
  />

  <AuthorForm
    v-if="showForm"
    :author-id="formAuthorId"
    @close="showForm = false"
    @submitted="onSaved"
  />

  <ConfirmDeleteModal
    v-model:show="showDeleteModal"
    :item-label="selectedAuthorToDelete?.name ?? ''"
    description="Usunięcie autora jest nieodwracalne."
    @confirm="confirmDelete"
    @cancel="selectedAuthorToDelete = null"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthors, useDeleteAuthor } from '@/composables/useAuthors'
import AuthorDetails from '@/components/author/AuthorDetails.vue'
import AuthorTable from '@/components/author/AuthorTable.vue'
import AuthorForm from '@/components/author/AuthorForm.vue'
import ConfirmDeleteModal from '@/components/commons/ConfirmDeleteModal.vue'
import type { Author } from '@/openapi/types'

const detailsAuthorId = ref<number | null>(null)

const viewAuthor = (author: Author) => {
  if (detailsAuthorId.value === author.id) {
    detailsAuthorId.value = null
    setTimeout(() => (detailsAuthorId.value = author.id), 0)
  } else {
    detailsAuthorId.value = author.id
  }
}
const page = ref(1)
const pageSize = 2
const { data: authors, isLoading, refetch } = useAuthors(page, pageSize)

const showForm = ref(false)
const formAuthorId = ref<number | null>(null)

const openCreate = () => {
  formAuthorId.value = null
  showForm.value = true
}

const editAuthor = (author: Author) => {
  formAuthorId.value = author.id
  showForm.value = true
}

const onSaved = () => {
  showForm.value = false
  refetch()
}

const showDeleteModal = ref(false)
const selectedAuthorToDelete = ref<Author | null>(null)
const deleteMutation = useDeleteAuthor()

const removeAuthor = (author: Author) => {
  selectedAuthorToDelete.value = author
  showDeleteModal.value = true
}

const confirmDelete = () => {
  if (!selectedAuthorToDelete.value) return
  deleteMutation.mutate(selectedAuthorToDelete.value.id, {
    onSettled: () => {
      showDeleteModal.value = false
      selectedAuthorToDelete.value = null
      refetch()
    },
  })
}
</script>
