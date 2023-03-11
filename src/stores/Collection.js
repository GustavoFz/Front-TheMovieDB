import axios from 'axios'
import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    collection: {
      page: 1,
      results: [],
      total_page: 0,
      total_results: 0
    },
    search: null,
    selected: null,
    selectedSeason: null,
    apiKey: import.meta.env.VITE_API_KEY
  }),
  actions: {
    async getSearchList(router) {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&language=en-US&query=${
            this.search || 'a'
          }&page=1&include_adult=false`
        )
        .then((response) => {
          this.collection = response.data
          router.push('/')
        })
        .catch((err) => console.log(err))
    },
    async getMovieById(id) {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US`)
        .then((response) => {
          this.selected = response.data
          this.getVideosByMovieId(id)
        })
        .catch((err) => console.log(err))
    },

    async getSeasonsById(id) {
      await axios
        .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=en-US`)
        .then((response) => {
          this.selected = response.data
          this.selected.media_type = 'tv'
          this.getVideosByTvId(id)
        })
        .catch((err) => console.log(err))
    },
    async getSeasonById(tvId, seasonId) {
      await axios
        .get(
          `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonId}?api_key=${this.apiKey}&language=en-US`
        )
        .then((response) => {
          this.selectedSeason = response.data
        })
        .catch((err) => console.log(err))
    },
    async getVideosByMovieId(id) {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.apiKey}&language=en-US`
        )
        .then((response) => {
          this.selected.listVideos = response.data.results
        })
        .catch((err) => console.log(err))
    },
    async getVideosByTvId(id) {
      await axios
        .get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${this.apiKey}&language=en-US`)
        .then((response) => {
          this.selected.listVideos = response.data.results
        })
        .catch((err) => console.log(err))
    },
    async selectSeason(itemId, seasonId, router) {
      await this.getSeasonById(itemId, seasonId)
      router.push('/season')
    }
  }
})
