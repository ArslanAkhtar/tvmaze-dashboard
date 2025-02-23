<template>
  <div v-if="seasons">
    <h2 class="text-xl font-semibold mb-5">Seasons:</h2>
    <div class="space-y-4">
      <div
        v-for="season in seasons"
        :key="season.id"
        class="border rounded-lg overflow-hidden border-[#FFC001]"
      >
        <button
          class="w-full flex justify-between items-center text-white px-4 py-3 hover:bg-[#2A2A2A] cursor-pointer transition-all duration-300 ease-in-out"
          :class="openSeasons === season.id ? 'bg-[#2A2A2A]' : 'bg-[#212121]'"
          @click="toggleSeason(season.id)"
        >
          <span class="text-lg font-medium">Season {{ season.number }}</span>
          <span
            class="transition-transform duration-300 ease-in-out"
            :class="openSeasons === season.id ? 'rotate-180' : 'rotate-0'"
          >
            <font-awesome-icon :icon="faChevronDown" class="text-lg" />
          </span>
        </button>

        <transition name="slide-fade" mode="out-in">
          <div
            v-if="openSeasons === season.id"
            class="p-4 bg-[#212121] text-gray-200"
          >
            <Episodes :id="season.id" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Episodes from "@/components/Episodes.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { Season } from "@/helpers/types";
import type { PropType } from "vue";
import { ref } from "vue";

defineProps({
  seasons: {
    type: Array as PropType<Season[]>,
    required: true
  }
});

const openSeasons = ref<number | null>(null);

const toggleSeason = (seasonId: number) => {
  openSeasons.value = openSeasons.value === seasonId ? null : seasonId;
};
</script>
