<template>
    <MainLayout>
        <div class="video-list-view">
            <div class="video-list-view-header">
                <SearchView :filters="['난이도', '데이터']" :first_options="['쉬움', '보통', '어려움']" :second_options="['영상', '문제']" :isRange="false" />
            </div>
            <div class="video-list">    
                <VideoCard v-for="video in dummyVideoList" :video="video" />
            </div>
        </div>
    </MainLayout>
</template>
<script setup lang="ts">
    import MainLayout from '@/layouts/MainLayout.vue';
    import SearchView from '@/common/components/shared/SearchView.vue'
    import VideoCard from '@/common/components/shared/VideoCard.vue'
    import { dummyVideoList } from '@/services/info';

    
</script>
<style scoped>
.video-list-view-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.video-list-view {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.video-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
</style>