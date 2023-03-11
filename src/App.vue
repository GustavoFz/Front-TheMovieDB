<template>
  <div class="flex justify-center bg-gray-800 h-screen overflow-auto">
    <Header />
    <div class="pt-20 w-[1140px] h-max">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>
