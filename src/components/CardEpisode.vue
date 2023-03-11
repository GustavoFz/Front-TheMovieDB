<template>
  <div v-if="episode" class="p-2 gap-4 flex bg-slate-600 rounded-md text-white text-center">
    <img :src="urlImg" class="object-cover h-36 w-60" />
    <div class="text-left">
      <h1 class="font-bold">{{ episode.name }}</h1>
      <p>{{ episode.overview }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    urlImg() {
      if (this.episode.still_path) {
        return 'https://image.tmdb.org/t/p/w500' + this.episode.still_path
      } else {
        return '/assets/not-found.png'
      }
    }
  }
}
</script>
