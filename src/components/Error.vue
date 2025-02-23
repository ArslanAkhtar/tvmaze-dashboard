<template>
  <div class="error">
    <img alt="Vue logo" class="logo" src="@/assets/error.png" width="40" />
    <div class="text-h6 font-weight-bold">{{ text }}</div>
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
