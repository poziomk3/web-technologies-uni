<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800">
    <!-- Header -->
    <header
      class="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10"
    >
      <RouterLink to="/" class="text-2xl font-semibold text-blue-600 hover:underline">
        📚 Library App
      </RouterLink>

      <nav class="flex gap-6 text-sm font-medium px-5">
        <RouterLink
          to="/books"
          class="text-gray-600 hover:text-blue-600 transition"
          active-class="text-blue-600 font-semibold"
          exact-active-class="border-b-2 border-blue-600"
        >
          Książki
        </RouterLink>
        <RouterLink
          to="/authors"
          class="text-gray-600 hover:text-blue-600 transition"
          active-class="text-blue-600 font-semibold"
          exact-active-class="border-b-2 border-blue-600"
        >
          Autorzy
        </RouterLink>
        <RouterLink
          to="/borrowings"
          class="text-gray-600 hover:text-blue-600 transition"
          active-class="text-blue-600 font-semibold"
          exact-active-class="border-b-2 border-blue-600"
        >
          Wypożyczenia
        </RouterLink>
      </nav>
    </header>

    <main class="flex-1 p-6 max-w-6xl mx-auto w-full animate-fade-in">
      <router-view />
    </main>

    <footer class="bg-white border-t p-4 text-center text-xs text-gray-500">
      &copy; {{ new Date().getFullYear() }} Twoja Biblioteka. Wszelkie prawa zastrzeżone.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import '../assets/main.css'
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.4s ease-out;
}
</style>
