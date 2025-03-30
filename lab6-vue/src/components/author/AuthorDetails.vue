<template>
    <n-modal
      v-model:show="visible"
      title="📘 Szczegóły autora"
      preset="card"
      class="max-w-md"
    >
      <div v-if="isLoading">Ładowanie...</div>
      <div v-else-if="error">Błąd: {{ error.message }}</div>
      <div v-else-if="author" class="space-y-2 text-sm text-gray-700">
        <p><strong>Imię i nazwisko:</strong> {{ author.name }}</p>
        <p><strong>Data urodzenia:</strong> {{ author.birthDate || 'Brak danych' }}</p>
        <p v-if="author.biography">
          <strong>Biografia:</strong><br />
          <span class="text-gray-600 whitespace-pre-line">{{ author.biography }}</span>
        </p>
      </div>
  
      <template #action>
        <n-button @click="emit('close')">Zamknij</n-button>
      </template>
    </n-modal>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthor } from '@/composables/useAuthors' // ✅ nowy hook
  
  const props = defineProps<{
    authorId: number
  }>()
  
  const emit = defineEmits<{
    (e: 'close'): void
  }>()
  
  const visible = ref(true)
  
  const { data: author, isLoading, error } = useAuthor(props.authorId)
  </script>
  