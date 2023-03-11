<template>
  <div v-for="(item, index) in store.collection.results" :key="index">
    <router-link
      :to="`/detail/${item.media_type}/${item.id}`"
      v-if="item.media_type === 'tv' || item.media_type === 'movie'"
      class="flex w-full gap-2 mb-2 p-2 bg-slate-700 rounded-md justify-between"
    >
      <div>
        <h1 class="text-sm font-medium text-gray-900 truncate dark:text-white">
          {{ item.name ? item.name : item.title }}
        </h1>
      </div>

      <div class="w-28">
        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
          Categoria: {{ item.media_type === 'tv' ? 'Serie' : 'Filme' }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCollectionStore } from '../stores/Collection'

const store = useCollectionStore()
const router = useRouter()

onMounted(() => {
  store.getSearchList(router)
})
</script>
