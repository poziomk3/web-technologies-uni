import BooksView from '@/views/BooksView.vue'
import AuthorsView from '@/views/AuthorsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BorrowingView from '@/views/BorrowingView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/books', component: BooksView },
  { path: '/authors', component: AuthorsView },
  { path: '/borrowings', component: BorrowingView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
