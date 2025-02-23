<template>
  <footer
    class="bg-[#212121] w-full flex flex-col items-center text-center p-4 mt-auto"
  >
    <div class="flex space-x-4 mb-2">
      <button
        v-for="icon in icons"
        :key="icon.name"
        class="p-2 text-white hover:text-gray-600 cursor-pointer"
        @click="openExternalLink(icon.link)"
      >
        <font-awesome-icon :icon="icon.name" class="text-2xl" />
      </button>
    </div>

    <div class="w-full border-t border-gray-300 my-2"></div>

    <div class="text-white">
      {{ currentYear }} — <strong>Muhammad Arslan</strong>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const icons = ref([
  { name: faGlobe, link: "https://www.muhammadarslan.nl/#home" },
  { name: faLinkedin, link: "https://www.linkedin.com/in/arslan-akhtar" },
  { name: faGithub, link: "https://github.com/ArslanAkhtar" }
]);

const currentYear = ref(new Date().getFullYear());

const openExternalLink = (url) => {
  window.open(url, "_blank");
};
</script>
