<template>
  <n-modal
    v-model:show="visible"
    title="Autor"
    preset="dialog"
    class="max-w-md"
    :closable="false"
  >
    <n-spin :show="isLoading">
      <n-form :model="form" :rules="rules" ref="formRef" label-placement="top" class="space-y-4">
        <n-form-item label="Imię i nazwisko" path="name">
          <n-input v-model:value="form.name" placeholder="Imię i nazwisko" />
        </n-form-item>

        <n-form-item label="Data urodzenia" path="birthDate">
          <n-date-picker
            v-model:value="form.birthDate"
            type="date"
            clearable
            placeholder="Wybierz datę"
          />
        </n-form-item>

        <n-form-item label="Biografia">
          <n-input
            v-model:value="form.biography"
            type="textarea"
            placeholder="Krótka biografia autora"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </n-form-item>

        <div class="flex justify-end gap-2 pt-2">
          <n-button @click="emit('close')">Anuluj</n-button>
          <n-button type="primary" :loading="isSubmitting" @click="handleSubmit">Zapisz</n-button>
        </div>
      </n-form>
    </n-spin>
  </n-modal>
</template>

<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NModal,
  NDatePicker,
  NSpin,
  type FormRules,
  type FormInst,
} from 'naive-ui'
import { ref, reactive, watch } from 'vue'
import { useCreateAuthor, useUpdateAuthor, useAuthor } from '@/composables/useAuthors'

// Props i emits
const props = defineProps<{
  authorId: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted'): void
}>()

const visible = ref(true)
const isSubmitting = ref(false)
const formRef = ref<FormInst | null>(null)

// 🧾 Form state
const form = reactive<{
  name: string
  birthDate: number | null
  biography: string
}>({
  name: '',
  birthDate: null,
  biography: '',
})

// ✅ Użycie useAuthor tylko jeśli edytujemy
const { data: authorData, isLoading } = useAuthor(props.authorId ?? 0)

watch(
  authorData,
  (author) => {
    if (author && props.authorId !== null) {
      form.name = author.name
      form.biography = author.biography ?? ''
      form.birthDate = author.birthDate ? new Date(author.birthDate).getTime() : null
    }
  },
  { immediate: true },
)

// ✅ Walidacja
const rules: FormRules = {
  name: {
    required: true,
    message: 'Imię i nazwisko są wymagane',
    trigger: 'blur',
  },
  birthDate: {
    type: 'number',
    required: true,
    message: 'Data urodzenia jest wymagana',
    trigger: 'change',
  },
}

// ✅ Mutacje
const createMutation = useCreateAuthor()
const updateMutation = useUpdateAuthor()

async function handleSubmit() {
  await formRef.value?.validate(async (errors) => {
    if (errors) return

    isSubmitting.value = true

    const payload = {
      ...form,
      birthDate: form.birthDate ? new Date(form.birthDate).toISOString().split('T')[0] : undefined,
    }

    if (props.authorId !== null) {
      // ✅ poprawnie: przekazujemy { id, author }
      await updateMutation.mutateAsync({
        id: props.authorId,
        author: payload,
      })
    } else {
      await createMutation.mutateAsync(payload)
    }

    isSubmitting.value = false
    emit('submitted')
  })
}
</script>
