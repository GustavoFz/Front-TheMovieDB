<template>
  <div class="flex-none rounded-md text-white text-center">
    <a
      :href="`https://www.youtube.com/watch?v=${video?.key}`"
      target="_blank"
      rel="noopener noreferrer"
    >
      <button>
        <img :src="`https://img.youtube.com/vi/${video?.key}/0.jpg`" class="object-contain h-36" />
      </button>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
