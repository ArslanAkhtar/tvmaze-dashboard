<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50"
      @click="closeModal"
    >
      <div
        class="bg-[#181818] rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-full overflow-y-auto relative modal-content"
        @click.stop
      >
        <div
          class="flex justify-between items-center p-4 border-b border-gray-700"
        >
          <h2 class="text-xl font-semibold text-white">All Shows</h2>
          <button
            class="text-gray-500 hover:text-gray-700 text-2xl"
            @click="closeModal"
          >
            &times;
          </button>
        </div>
        <div class="p-4">
          <div
            class="flex flex-row flex-wrap content-start gap-7 justify-around p-7"
          >
            <Card v-for="show in visibleShows" :key="show.id" :show="show" />
          </div>
          <div ref="target" class="h-1"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import Card from "./Card.vue";
import type { Show } from "@/helpers/types";
import useInfiniteScroll from "@/composables/InfiniteScroll";

const props = defineProps<{
  shows: Show[];
  isOpen: boolean;
}>();

const emits = defineEmits(["close"]);

const { target, displayCount, stop } = useInfiniteScroll();
const visibleShows = computed(() => props.shows.slice(0, displayCount.value));

const closeModal = () => {
  emits("close");
  stop();
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      stop();
    }
  }
);
</script>
