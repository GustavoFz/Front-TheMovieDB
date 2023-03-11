<template>
  <div v-if="ready">
    <div class="flex gap-4 p-2">
      <div>
        <img
          :src="`https://image.tmdb.org/t/p/w500${store.selectedSeason?.poster_path}`"
          class="object-contain w-96 h-96"
        />
      </div>
      <div class="w-full text-white">
        <h1 class="text-base font-bold">Temporada: {{ store.selectedSeason?.name }}</h1>
        <h1 class="text-base font-bold">
          Titulo: {{ store.selectedSeason?.name || store.selectedSeason?.title }}
        </h1>
        <p>{{ store.selectedSeason?.overview }}</p>
      </div>
    </div>
    <div>
      <h1 class="text-center my-2 rounded-md bg-slate-600 text-white font-bold">Episodios</h1>
      <div class="flex flex-col gap-2 justify-center py-2 overflow-auto">
        <CardEpisode
          v-for="(episode, index) in store.selectedSeason?.episodes"
          :episode="episode"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CardEpisode from '../components/CardEpisode.vue'
import { useCollectionStore } from '../stores/Collection'

const store = useCollectionStore()

const ready = ref(false)
const route = useRoute()

onMounted(async () => {
  store.getSeasonById(route.params.tvId, route.params.seasonId)
  ready.value = true
})
</script>
