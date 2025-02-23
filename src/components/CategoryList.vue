<template>
  <div class="mb-6" data-test-id="show-section">
    <div v-if="title" class="flex items-center mr-4 relative group mb-4">
      <div
        class="flex items-center font-semibold text-white text-2xl cursor-pointer"
        data-test-id="section-title"
        @click="openModal"
      >
        {{ title }}
        <span
          v-if="shows.length > dynamicLimit"
          class="ml-2 text-lg transform group-hover:rotate-90 transition-transform duration-300"
          >→</span
        >
      </div>
      <button
        v-if="shows.length > dynamicLimit"
        class="text-[#54b9c5] font-bold py-2 rounded ml-3 opacity-0 group-hover:opacity-100 transition-opacity transform duration-300 ease-in-out cursor-pointer"
        @click="openModal"
      >
        Explore All
      </button>
    </div>
    <div
      ref="container"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <Card v-for="(show, index) in limitedShows" :key="index" :show="show" />
    </div>
    <CategoryModal :shows="shows" :is-open="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useWindowSize } from "@vueuse/core";
import Card from "./Card.vue";
import CategoryModal from "./CategoryModal.vue";
import type { Show } from "@/helpers/types";

const props = defineProps<{
  title?: string;
  shows: Show[];
  limit?: number;
}>();

const { width: windowWidth } = useWindowSize();
const isModalOpen = ref(false);
const container = ref<HTMLElement | null>(null);

const dynamicLimit = ref(props.limit || 6);

const updateDynamicLimit = () => {
  if (windowWidth.value <= 768) {
    dynamicLimit.value = 4;
  } else {
    dynamicLimit.value = props.limit || 6;
  }
};

const limitedShows = computed(() => {
  return props.shows.slice(0, dynamicLimit.value);
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  updateDynamicLimit();
  window.addEventListener("resize", updateDynamicLimit);
});

watch(windowWidth, updateDynamicLimit);
</script>
