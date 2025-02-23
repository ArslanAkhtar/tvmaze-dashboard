<template>
  <div
    class="min-h-screen p-3 py-20 sm:p-10 md:p-10 xl:p-20"
    :style="backgroundImageStyle"
  >
    <div v-if="isFetching" class="flex items-center justify-center h-screen">
      <Loader />
    </div>

    <div v-else-if="isFinished && show" class="max-w-6xl mx-auto p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <img :src="show.image?.medium" alt="Show Poster" class="rounded-lg" />
        </div>

        <div class="md:col-span-2">
          <h1 class="text-3xl font-bold">{{ show.name }}</h1>
          <p
            class="mt-4 text-gray-300 text-justify"
            v-html="DOMPurify.sanitize(show.summary || '')"
          ></p>

          <div class="mt-6">
            <h2 class="text-lg font-semibold">Genre:</h2>
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="genre in show.genres"
                :key="genre"
                class="bg-gray-700 px-3 py-1 text-sm rounded-full"
              >
                {{ genre }}
              </span>
            </div>
          </div>

          <div class="mt-4">
            <h2 class="text-lg font-semibold">Rating:</h2>
            <p class="font-medium">
              {{ show.rating?.average ?? "N/A" }}
            </p>
          </div>

          <div class="mt-4">
            <h2 class="text-lg font-semibold">Language:</h2>
            <p class="font-medium">{{ show.language }}</p>
          </div>

          <div class="mt-4">
            <h2 class="text-lg font-semibold">Premiered:</h2>
            <p class="font-medium">{{ show.premiered }}</p>
          </div>

          <div class="mt-4">
            <h2 class="text-lg font-semibold">Status:</h2>
            <p class="font-medium">{{ show.status }}</p>
          </div>
          <Seasons v-if="seasons" :seasons="seasons" class="mt-8" />
          <Error
            v-else-if="errorFetchingSeasons"
            :text="errorFetchingSeasons"
          />
        </div>
      </div>
    </div>

    <div
      v-else-if="!show && isFinished"
      class="flex items-center justify-center h-screen"
    >
      <Error :text="showErrorMessage" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import DOMPurify from "dompurify";
import useFetchShows from "@/composables/FetchData";
import Seasons from "@/components/Seasons.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";

const { showDetails, loadShowSeasons } = useFetchShows();

const route = useRoute();
const id = Number(route.params.id);

onMounted(() => {
  window.scrollTo(0, 0);
});

const {
  data: show,
  isFinished,
  isFetching,
  error: showErrorMessage
} = showDetails(id);

const { data: seasons, error: errorFetchingSeasons } = loadShowSeasons(id);

const backgroundImageStyle = computed(() =>
  show.value?.image?.original
    ? `background: linear-gradient(to right, black 60%, transparent 110%), url('${show.value.image.original}'); background-size: cover;`
    : "background: black;"
);
</script>
