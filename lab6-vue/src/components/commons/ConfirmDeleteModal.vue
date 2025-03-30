<template>
  <n-modal
    v-model:show="internalVisible"
    preset="dialog"
    :title="title || 'Potwierdź usunięcie'"
    class="max-w-md"
    @after-leave="handleClose"
  >
    <div class="text-sm text-gray-700 space-y-2">
      <p>
        Czy na pewno chcesz usunąć
        <span class="font-semibold text-red-600">{{ itemLabel }}</span
        >?
      </p>
      <p v-if="description" class="text-xs text-gray-500">{{ description }}</p>
    </div>

    <template #action>
      <div class="flex justify-end gap-2">
        <n-button @click="cancel">Anuluj</n-button>
        <n-button type="error" @click="confirm">Usuń</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  show: boolean
  itemLabel: string
  description?: string
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const internalVisible = ref(props.show)

// zsynchronizuj wewnętrzny stan z props
watch(
  () => props.show,
  (v) => (internalVisible.value = v),
)
watch(internalVisible, (v) => emit('update:show', v))

function cancel() {
  emit('cancel')
  internalVisible.value = false
}

function confirm() {
  emit('confirm')
  internalVisible.value = false
}

function handleClose() {
  emit('update:show', false)
}
</script>
