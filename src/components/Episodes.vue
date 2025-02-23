<template>
  <div class="w-full h-full relative">
    <template v-if="isFetching">
      <Loader />
    </template>

    <template v-else-if="hasEpisodes">
      <ul
        class="space-y-4 overflow-y-auto max-h-[300px] scrollbar scrollbar-thumb-gray-500 scrollbar-track-transparent"
      >
        <li
          v-for="(episode, i) in episodes"
          :key="i"
          class="flex items-center space-x-4 p-4 rounded-md hover:bg-[#2A2A2A] cursor-pointer transition-all"
          @click="() => openExternalURL(episode.url)"
        >
          <img
            :src="imgURL(episode.image?.medium)"
            alt="Episode Image"
            class="w-12 h-12 object-cover rounded-full"
          />
          <div class="flex-1">
            <p class="font-medium text-lg">{{ episode.name }}</p>
            <p class="text-sm text-gray-500">Episode {{ episode.number }}</p>
          </div>
          <span class="text-lg text-gray-600">
            <i class="mdi mdi-play"></i>
          </span>
        </li>
      </ul>
    </template>

    <template v-else>
      <div class="flex justify-center items-center h-full">
        <Error :text="ErrorText || 'An unknown error occurred.'" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useFetchShows from "@/composables/FetchData";
import Loader from "@/components/Loader.vue";
import { imgURL, openExternalURL } from "@/helpers/utility";
import Error from "@/components/Error.vue";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const { loadShowEpisodes } = useFetchShows();
const {
  data: episodes,
  isFetching,
  error: ErrorText
} = loadShowEpisodes(props.id);

const hasEpisodes = computed(() => episodes.value && episodes.value.length > 0);
</script>
