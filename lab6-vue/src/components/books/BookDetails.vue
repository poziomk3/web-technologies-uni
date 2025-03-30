<template>
  <n-modal v-model:show="visible" title="📖 Szczegóły książki" preset="card" class="max-w-2xl">
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
      ⏳ Ładowanie danych książki...
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-6">❌ Błąd: {{ error.message }}</div>

    <div v-else-if="book" class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800">
      <div>
        <p class="font-semibold text-gray-700">📘 Tytuł:</p>
        <p>{{ book.title }}</p>

        <p class="font-semibold text-gray-700 mt-4">👤 Autor:</p>
        <p>{{ authorName }}</p>

        <p class="font-semibold text-gray-700 mt-4">📅 Data publikacji:</p>
        <p>{{ book.publicationDate }}</p>

        <p class="font-semibold text-gray-700 mt-4">🏷️ Gatunek:</p>
        <p>{{ book.genre || 'Brak' }}</p>

        <p class="font-semibold text-gray-700 mt-4">⭐ Ocena:</p>
        <p>{{ book.rating }}/5</p>
      </div>

      <div>
        <p class="font-semibold text-gray-700">📝 Opis:</p>
        <p class="text-gray-600 whitespace-pre-line mt-1">
          {{ book.description || 'Brak opisu' }}
        </p>
      </div>
    </div>

    <template #action>
      <n-button @click="emit('close')" class="mt-2">Zamknij</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBook } from '@/composables/useBooks'

const props = defineProps<{
  bookId: number
  authorsMap: Record<string, string>
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const visible = ref(true)

const { data: book, isLoading, error } = useBook(props.bookId)

const authorName = computed(() =>
  book.value ? (props.authorsMap[book.value.authorId] ?? 'Nieznany autor') : '',
)
</script>
