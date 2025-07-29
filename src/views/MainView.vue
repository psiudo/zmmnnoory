<!-- [FILEPATH] src/views/MainView.vue -->
<template>
  <AppHeader></AppHeader>
  <img class="main-image" src="@/assets/main_image.png" alt="main">
</template>

<script setup lang="ts">
  import AppHeader from '@/common/components/shared/AppHeader.vue';
</script>

<style scoped>
  .main-image {
    width: 100%;
    margin-top: 25px;
  }
</style>
