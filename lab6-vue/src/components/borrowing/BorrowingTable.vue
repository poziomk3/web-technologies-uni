<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="borrowings"
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
import { NButton, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import type { Borrowing } from '@/openapi/types'

const props = defineProps<{
  borrowings: Borrowing[]
  total: number
  page: number
  pageSize: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'return', id: number): void
}>()

function renderActions(row: Borrowing) {
  if (row.status === 'returned') return null

  return h(
    NButton,
    {
      size: 'small',
      type: 'primary',
      onClick: () => emit('return', row.id),
    },
    {
      default: () => 'Zwróć książkę', 
    },
  )
}

const columns: DataTableColumns<Borrowing> = [
  { title: 'ID Wypożyczenia', key: 'id' },
  { title: 'ID Książki', key: 'id_book' },
  { title: 'Data wypożyczenia', key: 'borrow_date' },
  { title: 'Data zwrotu', key: 'return_date' },
  {
    title: 'Status',
    key: 'status',
    render: (row) =>
      h(
        NTag,
        { type: row.status === 'borrowed' ? 'warning' : 'success' },
        { default: () => (row.status === 'borrowed' ? 'Wypożyczona' : 'Zwrócona') },
      ),
  },
  {
    title: 'Akcje',
    key: 'actions',
    render: renderActions,
  },
]
</script>
