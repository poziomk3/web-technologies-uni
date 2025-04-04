<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="books"
      :loading="loading"
      :pagination="false"
      bordered
    />

    <div class="flex justify-end mt-4">
      <n-pagination
        :page="page"
        :page-size="pageSize"
        :item-count="total"
        @update:page="$emit('update:page', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Book } from '@/openapi/types'
const props = defineProps<{
  books: Book[]
  total: number
  page: number
  pageSize: number
  loading: boolean
  authorsMap: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'edit', book: Book): void
  (e: 'delete', book: Book): void
  (e: 'view', book: Book): void
}>()
function renderActions(row: Book) {
  return h('div', { class: 'flex gap-2' }, [
    h(NButton, { size: 'small', onClick: () => emit('view', row) }, { default: () => 'Szczegóły' }),
    h(
      NButton,
      { size: 'small', type: 'primary', onClick: () => emit('edit', row) },
      { default: () => 'Edytuj' },
    ),
    h(
      NButton,
      { size: 'small', type: 'error', onClick: () => emit('delete', row) },
      { default: () => 'Usuń' },
    ),
  ])
}

const columns: DataTableColumns<Book> = [
  { title: 'Tytuł', key: 'title' },
  {
    title: 'Autor',
    key: 'authorId',
    render: (row) => props.authorsMap[row.authorId] || 'Nieznany autor',
  },
  { title: 'Rok', key: 'publicationDate' },
  {
    title: 'Akcje',
    key: 'actions',
    render: renderActions,
  },
]
</script>
