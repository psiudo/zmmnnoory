<template>
  <div class="video-card">
    <img 
      :src="video.thumbnail" 
      alt="video thumbnail" 
    >
  </div>
</template>

<script setup lang="ts">
  import type {Video} from '@/services/info'

  defineProps<{
    video: Video
  }>()
</script>

<style scoped>
  .video-card {
    width: 392px;
    height: 225px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #5A5A5A;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .video-card img {
    height: 100%;
    width: auto;
  }
</style>