<template>
  <HomeBanner v-if="latestShow" :show="latestShow" data-test-id="home-banner" />
  <div class="min-h-screen p-10 sm:p-10 md:p-10 xl:p-20">
    <Filters
      v-if="latestShow"
      :genre-filters="genreFilters"
      :is-data-available="isDataAvailable"
      data-test-id="filters"
      @search-change="(text) => (query = text)"
      @genre-change="(genres: string[]) => (selectedGenres = genres)"
      @rating-change="(rating: string) => (selectedRating = rating)"
    />

    <Loader v-if="isFiltering ? !shows : !allShows" data-test-id="loader" />

    <div v-if="isFiltering" class="mt-10">
      <div
        class="mt-10 mb-10 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6"
      >
        <Card
          v-for="show in shows?.slice(0, displayCount)"
          :key="show?.id"
          :show="show"
          data-test-id="show-card"
        />
      </div>
    </div>
    <div v-else class="mt-10">
      <CategoryList
        v-for="category in allShows?.slice(0, displayCount)"
        :key="category.genre"
        :title="category.genre"
        :shows="category.shows"
        data-test-id="category-list"
      />
    </div>

    <NoData
      v-if="
        !isFiltering
          ? allShows && allShows.length === 0
          : shows && shows.length === 0
      "
      :text="ErrorMessages.NoData"
      data-test-id="no-data"
    />
  </div>

  <LoadMore
    v-if="
      (isFiltering ? (shows?.length ?? 0) : (allShows?.length ?? 0)) > 0 &&
      displayCount <
        (isFiltering ? (shows?.length ?? 0) : (allShows?.length ?? 0))
    "
    ref="target"
    data-test-id="load-more"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, ref } from "vue";
import CategoryList from "@/components/CategoryList.vue";
import LoadMore from "@/components/LoadMore.vue";
import Loader from "@/components/Loader.vue";
import Filters from "@/components/Filters.vue";
import useFilteredShows from "@/composables/Filters";
import useInfiniteScroll from "@/composables/InfiniteScroll";
import NoData from "@/components/NoData.vue";
import { ErrorMessages } from "@/helpers/enum";
import Card from "@/components/Card.vue";
import HomeBanner from "@/components/HomeBanner.vue";

const { target, displayCount, stop } = useInfiniteScroll();
const isDataAvailable = ref(true);
const {
  fetchedShows,
  shows,
  allShows,
  query,
  genreFilters,
  selectedRating,
  selectedGenres
} = useFilteredShows();

onMounted(async () => {
  try {
    window.scrollTo(0, 0);
    await fetchedShows();
  } catch (error) {
    console.error("Error fetching shows:", error);
  }
});

onUnmounted(() => {
  stop();
});

watch(shows, () => {
  if (shows.value && shows.value?.length > 0) {
    isDataAvailable.value = true;
  } else {
    isDataAvailable.value = false;
  }
});

const latestShow = computed(() => {
  if (shows.value && shows.value.length > 0) {
    return shows.value[0];
  } else if (allShows.value && allShows.value.length > 0) {
    return allShows.value[0]?.shows[0];
  }
  return null;
});

const isFiltering = computed(() => {
  const hasQuery = query.value && query.value.trim() !== "";
  const hasGenres =
    Array.isArray(selectedGenres.value) && selectedGenres.value.length > 0;
  const hasRating =
    selectedRating.value !== null &&
    selectedRating.value !== undefined &&
    selectedRating.value !== "";
  return hasQuery || hasGenres || hasRating;
});
</script>
