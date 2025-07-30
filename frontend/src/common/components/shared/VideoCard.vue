<template>
  <div class="video-wrapper">
    <div class="video-card">
      <img :src="video.thumbnailUrl" alt="video thumbnail">
    </div>
    <div class="video-info">
      <img class="profile" src="@/assets/test_profile.png" alt="profile">
      <div class="text-info">
        <span class="title">{{ video.title }}</span>
        <span class="nickname">{{ video.memberNickname }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type {VideoList} from '@/services/info'

  defineProps<{
    video: VideoList
  }>()
</script>

<style scoped>
  .video-wrapper {
    width: 392px;
    height: 293px;
    display: flex;
    flex-direction: column;
  }

  .video-card {
    width: 392px;
    height: 225px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #5A5A5A;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0 5px 30px rgba(0, 0, 0, 0.25));
  }

  .video-card img {
    height: 100%;
    width: auto;
  }

  .profile {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin: 14px 16px 0 0;
  }

  .video-info {
    display: flex;
    align-items: flex-start;
  }

  .text-info {
    display: flex;
    flex-direction: column;
  }

  .title {
    display: flex;
    width: 342px;
    height: auto;
    flex-direction: column;
    justify-content: flex-start;
    flex-shrink: 0;
    color: #2E2E2E;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 14px;
  }

  .nickname {
    color: #A0A0A0;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 5px;
  }
</style>