<template>
  <div
    class="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden rounded-lg shadow-lg"
    data-test-id="home-banner"
  >
    <div
      class="absolute inset-0 bg-cover bg-center scale-110"
      :style="{ backgroundImage: `url(${show.image.original})` }"
      data-test-id="background-image"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black"
      data-test-id="gradient-overlay"
    ></div>
    <div
      class="relative z-10 flex flex-col justify-end h-full px-10 sm:px-16 lg:px-20 pb-8 max-w-3xl text-white"
    >
      <h1 class="text-3xl sm:text-4xl font-extrabold" data-test-id="show-name">
        {{ show.name }}
      </h1>
      <p
        class="mt-2 text-sm sm:text-base text-gray-300 text-justify"
        data-test-id="show-summary"
      >
        {{ cleanDescription(show.summary) }}
      </p>
      <div class="mt-2 flex flex-wrap gap-2" data-test-id="genres">
        <span
          v-for="(genre, index) in show.genres"
          :key="index"
          class="px-3 py-1 text-xs sm:text-sm bg-gray-700/50 rounded-full"
          data-test-id="genre-item"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Object,
      required: true
    }
  },
  methods: {
    cleanDescription(html) {
      return html.replace(/<[^>]*>/g, "");
    }
  }
};
</script>
