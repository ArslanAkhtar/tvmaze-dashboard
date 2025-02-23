<template>
  <header
    class="bg-[#212121] text-white fixed top-0 w-full z-50 px-10 sm:px-10 md:px-20 xl:px-20 py-4 flex items-center justify-between cursor-pointer"
    data-test-id="header"
    @click="navigateToRoute(RouteNavigation.Home)"
  >
    <div class="text-3xl font-bold text-[#FFC001]" data-test-id="header-title">
      TV MAZE
    </div>
    <nav class="hidden md:flex space-x-6 text-sm" data-test-id="nav-menu">
      <a
        v-for="item in menuItems"
        :key="item"
        href="#"
        class="hover:text-gray-400"
        data-test-id="nav-item"
      >
        {{ item }}
      </a>
    </nav>
    <div class="flex space-x-4"></div>
  </header>
</template>

<script setup lang="ts">
import { navigateToRoute } from "@/helpers/utility";
import { RouteNavigation } from "@/helpers/enum";
const menuItems: string[] = [];
</script>
