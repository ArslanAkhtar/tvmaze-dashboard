<template>
  <div class="relative" data-test-id="show-card">
    <div
      class="group w-40 sm:w-48 md:w-56 rounded-lg overflow-hidden bg-gray-900 shadow-lg cursor-pointer"
      data-test-id="image-container"
      v-bind="hoverEvents"
      @click="navigateToRoute(RouteNavigation.ShowDetails, { id: show?.id })"
    >
      <img
        :src="imgURL(show?.image?.medium)"
        alt="Item Image"
        class="w-full h-60 sm:h-80 md:h-88 object-cover"
        data-test-id="show-image"
      />
    </div>

    <div
      v-if="hovered"
      class="absolute top-0 left-0 w-full bg-black text-white shadow-lg rounded-lg z-50 cursor-pointer hover:translate-x-[-11.5%] transition-transform duration-200 ease-in-out transform hover:scale-105 hover:w-2xs"
      data-test-id="hover-overlay"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @click="navigateToRoute(RouteNavigation.ShowDetails, { id: show?.id })"
    >
      <img
        :src="imgURL(show?.image?.medium)"
        alt="Item Image"
        class="w-full h-60 sm:h-80 md:h-88 object-cover rounded-t-lg"
        data-test-id="hover-image"
      />
      <div class="p-6 bg-[#212121] rounded-b-lg">
        <h2 class="text-md font-bold truncate" data-test-id="show-title">
          {{ show?.name }}
        </h2>

        <p class="mt-2 text-xs text-gray-300" data-test-id="show-genres">
          <span
            v-for="(genre, index) in show.genres"
            :key="genre + show?.name"
            class="mr-1 before:content-['•'] before:mx-2"
            :class="{ 'before:content-none': index === 0 }"
            :data-test-id="`genre-item-${index}`"
          >
            {{ genre }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { imgURL, navigateToRoute } from "@/helpers/utility";
import { RouteNavigation } from "@/helpers/enum";
import type { Show } from "@/helpers/types";
import { useWindowSize } from "@vueuse/core";

const hovered = ref(false);
const isMobileTablet = ref(false);
const { width: windowWidth } = useWindowSize();

const updateDynamicLimit = () => {
  if (windowWidth.value <= 1024) {
    isMobileTablet.value = true;
  } else {
    isMobileTablet.value = false;
  }
};

onMounted(() => {
  updateDynamicLimit();
  window.addEventListener("resize", updateDynamicLimit);
});

watch(windowWidth, updateDynamicLimit);

const hoverEvents = computed(() => {
  return isMobileTablet.value
    ? {}
    : {
        onMouseenter: () => (hovered.value = true),
        onMouseleave: () => (hovered.value = false)
      };
});

defineProps<{ show: Show }>();
</script>
