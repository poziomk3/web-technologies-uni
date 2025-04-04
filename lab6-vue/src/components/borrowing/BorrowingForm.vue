<template>
  <n-modal
    v-model:show="visible"
    title="Wypożycz książkę"
    preset="dialog"
    class="max-w-md"
    :closable="false"
  >
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="top"
      class="flex flex-col gap-4"
    >
      <n-form-item label="Wybierz książkę" path="id_book">
        <n-select
          v-model:value="form.id_book"
          :options="bookOptions"
          placeholder="Wybierz książkę do wypożyczenia"
        />
      </n-form-item>

      <div class="flex justify-end gap-2">
        <n-button @click="emit('close')">Anuluj</n-button>
        <n-button type="primary" @click="handleSubmit" :loading="isSubmitting"> Wypożycz </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { NForm, NFormItem, NSelect, NButton, NModal, type FormInst, type FormRules } from 'naive-ui'
import { ref, reactive, computed } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useCreateBorrowing } from '@/composables/useBorrowings'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted'): void
}>()

const visible = ref(true)
const formRef = ref<FormInst | null>(null)
const isSubmitting = ref(false)

const form = reactive<{ id_book: number | null }>({
  id_book: null,
})

const { data: booksData } = useBooks(ref(1), 100)
const bookOptions = computed(() =>
  (booksData.value?.items ?? []).map((book) => ({
    label: `${book.title} (${book.id})`,
    value: book.id,
  })),
)

const rules: FormRules = {
  id_book: {
    required: true,
    message: 'Musisz wybrać książkę',
    trigger: 'blur',
    type: 'number',
  },
}

const createMutation = useCreateBorrowing()

async function handleSubmit() {
  await formRef.value?.validate(async (errors) => {
    if (errors) return
    isSubmitting.value = true

    createMutation.mutateAsync({ id_book: form.id_book! })

    isSubmitting.value = false
    emit('submitted')
  })
}
</script>
