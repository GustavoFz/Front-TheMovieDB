<template>
  <div v-if="ready">
    <div class="flex gap-4 p-2">
      <div>
        <img
          :src="`https://image.tmdb.org/t/p/w500${store.selected?.poster_path}`"
          class="object-contain w-96 h-96"
        />
      </div>
      <div class="w-full text-white">
        <h1 class="text-base font-bold">
          Titulo: {{ store.selected?.name || store.selected?.title }}
        </h1>
        <p>{{ store.selected?.overview }}</p>
      </div>
    </div>
    <div v-if="store.selected?.media_type === 'tv'">
      <h1 class="text-center my-2 rounded-md bg-slate-600 text-white font-bold">Temporadas</h1>
      <div class="flex flex-nowrap gap-2 py-2 overflow-auto">
        <router-link
          :to="`/season/${store.selected?.id}/${season.season_number}`"
          v-for="(season, index) in store.selected?.seasons"
          :key="index"
          class="p-2 flex-none bg-slate-600 rounded-md text-white text-center"
        >
          <img :src="urlBase + season.poster_path" class="object-contain h-36" />
          <p>{{ season.name }}</p>
        </router-link>
      </div>
    </div>
    <div v-if="store.selected?.listVideos?.length > 0">
      <h1 class="text-center my-2 rounded-md bg-slate-600 text-white font-bold">Videos</h1>
      <div class="flex flex-nowrap gap-2 overflow-auto">
        <CardVideo
          v-for="(video, index) in store.selected?.listVideos"
          :video="video"
          :key="index"
        />
      </div>
    </div>
    <div>
      <h1 class="text-center my-2 rounded-md bg-slate-600 text-white font-bold">Imagens</h1>
      <div class="flex flex-nowrap gap-2 justify-center overflow-auto">
        <div v-if="store.selected?.backdrop_path" class="flex gap-2 justify-center">
          <div class="p-2 rounded-md text-white text-center">
            <a
              :href="urlBase + store.selected?.backdrop_path"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img :src="urlBase + store.selected?.backdrop_path" class="object-contain h-36" />
              </button>
            </a>
          </div>
        </div>
        <div v-if="store.selected?.poster_path" class="flex gap-2 justify-center">
          <div class="p-2 rounded-md text-white text-center">
            <a
              :href="urlBase + store.selected?.poster_path"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img
                  :src="urlBase + store.selected?.poster_path"
                  class="object-contain w-28 h-36"
                />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CardVideo from '../components/CardVideo.vue'
import { useCollectionStore } from '../stores/Collection'

const store = useCollectionStore()

const ready = ref(false)
const route = useRoute()

onMounted(async () => {
  if (route.params.type === 'tv') {
    await store.getSeasonsById(route.params.id)
  } else {
    await store.getMovieById(route.params.id)
  }
  ready.value = true
})

const urlBase = 'https://image.tmdb.org/t/p/w500'
</script>
