<template>
  <div>
    <n-data-table
      :columns="columns"
      :data="authors"
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
import type { Author } from '@/openapi/types';

const props = defineProps<{
  authors: Author[]
  total: number
  page: number
  pageSize: number
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
  (e: 'edit', author: Author): void
  (e: 'delete', author: Author): void
  (e: 'view', author: Author): void
}>()

function renderActions(row: Author) {
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

const columns: DataTableColumns<Author> = [
  { title: 'Imię i nazwisko', key: 'name' },
  { title: 'Data urodzenia', key: 'birthDate' },
  {
    title: 'Akcje',
    key: 'actions',
    render: renderActions,
  },
]
</script>
