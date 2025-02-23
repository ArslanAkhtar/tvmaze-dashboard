<template>
  <div class="flex flex-wrap justify-center items-center gap-4 mt-3">
    <div class="relative w-full sm:w-1/2 md:w-1/3 xl:w-1/6">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full pr-10 p-3 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent placeholder-white"
        placeholder="Search Shows"
        data-test-id="search-input"
        @input="emitSearch"
      />
      <font-awesome-icon
        icon="search"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>

    <BaseSelect
      v-model="selectedGenres"
      :options="genreFilters"
      label="Genres"
      multi-select
      data-test-id="genre-filter"
      @update:model-value="emitGenre"
    />

    <BaseSelect
      v-model="selectedRating"
      :options="ratingOptions"
      label="Rating"
      data-test-id="rating-filter"
      @update:model-value="emitRating"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import BaseSelect from "./BaseSelect.vue";

const props = defineProps<{
  genreFilters: string[];
  isDataAvailable: boolean;
}>();

const emit = defineEmits(["search-change", "genre-change", "rating-change"]);

const searchQuery = ref("");
const selectedGenres = ref<string[]>([]);
const selectedRating = ref<string>("");

const ratingOptions = computed(() =>
  props.isDataAvailable
    ? Array.from({ length: 10 }, (_, index) =>
        index === 0 ? "" : `${index} +`
      )
    : []
);

const emitSearch = () => {
  emit("search-change", searchQuery.value);
};

const emitGenre = () => {
  emit("genre-change", selectedGenres.value);
};

const emitRating = () => {
  emit("rating-change", selectedRating.value);
};
</script>
