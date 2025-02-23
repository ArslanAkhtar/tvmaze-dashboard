<template>
  <div
    class="flex justify-center flex-col items-center h-full w-full"
    data-test-id="no-data-container"
  >
    <img
      alt="No Data"
      class="logo"
      src="@/assets/no-data.svg"
      width="320"
      data-test-id="no-data-image"
    />
    <h2
      class="text-3xl font-bold text-[#FFC001] capitalize"
      data-test-id="no-data-text"
    >
      {{ text }}
    </h2>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>
