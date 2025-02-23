<template>
  <div class="min-h-screen bg-black text-white">
    <Header />
    <RouterView />
    <Copyright />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Copyright from "@/components/Copyright.vue";
</script>
