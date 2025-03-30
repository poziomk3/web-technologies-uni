<template>
  <n-modal
    v-model:show="visible"
    title="📚 Książka"
    preset="dialog"
    class="max-w-2xl"
    :closable="false"
  >
    <n-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-placement="top"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <n-form-item label="Tytuł" path="title" class="col-span-full">
        <n-input v-model:value="form.title" placeholder="Tytuł książki" />
      </n-form-item>

      <n-form-item label="Autor" path="authorId">
        <n-select
          v-model:value="form.authorId"
          :options="authorOptions"
          placeholder="Wybierz autora"
        />
      </n-form-item>

      <n-form-item label="Data publikacji" path="publicationDate">
        <n-date-picker v-model:value="form.publicationDate" type="date" clearable />
      </n-form-item>

      <n-form-item label="Gatunek" path="genre">
        <n-input v-model:value="form.genre" placeholder="np. Fantasy, Dramat..." />
      </n-form-item>

      <n-form-item label="Ocena" path="rating">
        <n-input-number
          v-model:value="form.rating"
          :min="0"
          :max="5"
          :step="0.1"
          placeholder="0 - 5"
        />
      </n-form-item>

      <n-form-item label="Okładka (URL)" class="col-span-full">
        <n-input v-model:value="form.coverImage" placeholder="https://..." />
      </n-form-item>

      <n-form-item label="Opis" path="description" class="col-span-full">
        <n-input
          type="textarea"
          v-model:value="form.description"
          placeholder="Krótki opis książki..."
          autosize
        />
      </n-form-item>

      <div class="col-span-full flex justify-end gap-2 mt-4">
        <n-button @click="emit('close')">Anuluj</n-button>
        <n-button type="primary" @click="handleSubmit" :loading="isSubmitting"> Zapisz </n-button>
      </div>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NButton,
  NModal,
  NInputNumber,
  NDatePicker,
  NSelect,
  type FormRules,
  type FormInst,
} from 'naive-ui'

import { ref, reactive, computed, watch } from 'vue'
import { useCreateBook, useUpdateBook, useBook } from '@/composables/useBooks'
import { useAuthors } from '@/composables/useAuthors'

// Props & Emits
const props = defineProps<{ bookId: number | null }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted'): void
}>()

const visible = ref(true)
const isSubmitting = ref(false)
const formRef = ref<FormInst | null>(null)

const form = reactive<{
  title: string
  authorId: string
  publicationDate: number | null
  genre: string
  description: string
  coverImage: string
  rating: number
}>({
  title: '',
  authorId: '',
  publicationDate: null,
  genre: '',
  description: '',
  coverImage: '',
  rating: 0,
})

// 🔁 Load authors
const { data: authorsData } = useAuthors(ref(1), 1000)
const authorOptions = computed(
  () =>
    authorsData.value?.items.map((author) => ({
      label: author.name,
      value: author.id.toString(),
    })) ?? [],
)

// 🔍 Load book if editing
const { data: bookData, isLoading } = useBook(props.bookId ?? 0)

watch(
  bookData,
  (book) => {
    if (book && props.bookId !== null) {
      form.title = book.title
      form.authorId = book.authorId
      form.genre = book.genre ?? ''
      form.description = book.description ?? ''
      form.coverImage = book.coverImage ?? ''
      form.rating = book.rating ?? 0
      form.publicationDate = book.publicationDate ? new Date(book.publicationDate).getTime() : null
    }
  },
  { immediate: true },
)

// ✅ Rules
const rules: FormRules = {
  title: { required: true, message: 'Tytuł jest wymagany', trigger: 'blur' },
  authorId: { required: true, message: 'Autor jest wymagany', trigger: 'blur' },
  publicationDate: {
    required: true,
    type: 'number',
    message: 'Data publikacji jest wymagana',
    trigger: 'change',
  },
}

// ✅ Mutations
const createMutation = useCreateBook()
const updateMutation = useUpdateBook()

async function handleSubmit() {
  await formRef.value?.validate(async (errors) => {
    if (errors) return
    isSubmitting.value = true

    const payload = {
      ...form,
      publicationDate: form.publicationDate
        ? new Date(form.publicationDate).toISOString().split('T')[0]
        : undefined,
    }

    if (props.bookId !== null) {
      await updateMutation.mutateAsync({ id: props.bookId, book: payload })
    } else {
      await createMutation.mutateAsync(payload)
    }

    isSubmitting.value = false
    emit('submitted')
  })
}
</script>
