<template>
    <MainLayout>
        <div class="video-list-view">
            <div class="video-list-view-header">
                <SearchView :filters="['난이도', '데이터']" :first_options="['쉬움', '보통', '어려움']" :second_options="['영상', '문제']" :isRange="false" />
            </div>
            <div class="video-list">    
                <VideoCard v-for="video in videoList" :video="video" />
            </div>
        </div>
    </MainLayout>
</template>
<script setup lang="ts">
    import MainLayout from '@/layouts/MainLayout.vue';
    import SearchView from '@/common/components/shared/SearchView.vue'
    import VideoCard from '@/common/components/shared/VideoCard.vue'
    import { ref } from 'vue'

    // 세로 이미지, 가로 이미지 등 다양한 비율의 썸네일을 사용하도록 수정
    const videoList = ref([
        {
            id: 1,
            participation_id: 1,
            title: '테스트 영상',
            desc: '테스트 영상 설명',
            // 가로형 이미지
            thumbnail: 'https://picsum.photos/400/225?random=1',
            url: 'https://example.com/video1',
            is_public: true,
        },
        {
            id: 2,
            participation_id: 2,
            title: '테스트 영상 2',
            desc: '테스트 영상 설명 2',
            // 세로형 이미지
            thumbnail: 'https://picsum.photos/225/400?random=2',
            url: 'https://example.com/video2',
            is_public: true,
        },
        {
            id: 3,
            participation_id: 3,
            title: '테스트 영상 3',
            desc: '테스트 영상 설명 3',
            // 정사각형 이미지
            thumbnail: 'https://picsum.photos/300/300?random=3',
            url: 'https://example.com/video3',
            is_public: true,
        },
        {
            id: 4,
            participation_id: 4,
            title: '테스트 영상 4',
            desc: '테스트 영상 설명 4',
            // 가로형 이미지
            thumbnail: 'https://picsum.photos/500/250?random=4',
            url: 'https://example.com/video4',
            is_public: true,
        },
        {
            id: 5,
            participation_id: 5,
            title: '테스트 영상 5',
            desc: '테스트 영상 설명 5',
            // 세로형 이미지
            thumbnail: 'https://picsum.photos/200/350?random=5',
            url: 'https://example.com/video5',
            is_public: true,
        },
        {
            id: 6,
            participation_id: 6,
            title: '테스트 영상 6',
            desc: '테스트 영상 설명 6',
            // 정사각형 이미지
            thumbnail: 'https://picsum.photos/350/350?random=6',
            url: 'https://example.com/video6',
            is_public: true,
        },
    ])
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