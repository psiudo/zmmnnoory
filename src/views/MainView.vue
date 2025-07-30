<!-- [FILEPATH] src/views/MainView.vue -->
<template>
  <AppHeader></AppHeader>
  
  <!-- 메인 배너 이미지 -->
  <img class="main-image" src="@/assets/main_image.png" alt="main">

  <!-- 게임 목록 -->
  <div class="container">
    <div>
      <span class="title">게임 목록</span>
      <RouterLink :to="{ name: 'games' }" class="wrapper">
        <span class="link">전체 게임 보러가기</span>
        <div class="triangle-right"></div>
      </RouterLink>
    </div>
    <span class="tag"># MZ가 많이 플레이하는 게임</span>
    <div class="game-list">
      <GameCard
        v-for="game in randomGames"
        :key="game.id"
        :game="game"
        :participationStatus="getParticipationStatus(game.title)"
      />
    </div>
  </div>

  <!-- 영상 목록 -->
  <div class="container">
    <div>
      <span class="title">영상 목록</span>
      <RouterLink :to="{ name: 'games' }" class="wrapper">
        <span class="link">전체 영상 보러가기</span>
        <div class="triangle-right"></div>
      </RouterLink>
    </div>
    <span class="tag"># MZ가 주목하는 챌린지 영상</span>
    <div class="video-list">
      <VideoCard
        v-for="video in randomVideos"
        :video="video"
      />
    </div>
  </div>

  <!-- 데이터 요청 -->
  <Request></Request>

  <SiteFooter></SiteFooter>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  // import { useGameStore } from '@/store/Games';
  import { useParticipationStore } from '@/store/Participations';
  import { dummyGames, type Game, dummyVideoList, type VideoList } from '@/services/info';

  import AppHeader from '@/common/components/shared/AppHeader.vue';
  import SiteFooter from '@/common/components/shared/SiteFooter.vue';
  import GameCard from '@/common/components/shared/GameCard.vue';
  import VideoCard from '@/common/components/shared/VideoCard.vue';
  import Request from '@/modules/main/Request.vue';

  // const gamestore = useGameStore()
  const participationstore = useParticipationStore()
  const randomGames = ref<Game[] | null>(null)
  const randomVideos = ref<VideoList[] | null>(null)

  // 참여한 게임인지 확인하는 함수
  const getParticipationStatus = (title: string): 'COMPLETED' | 'NOT_PARTICIPATED' => {
    const found = (participationstore.participated_game ?? []).find(p => p.gameTitle === title)
    return found ? (found.status as 'COMPLETED' | 'NOT_PARTICIPATED') : 'NOT_PARTICIPATED'
  }

  onMounted(async () => {
    // await gamestore.getGameList()
    await participationstore.getParticipatedGame()

    // const allGames = gamestore.game_list ?? []
    const allGames = dummyGames
    if (allGames.length > 0) {
      // 랜덤 섞기 + 4개 선택
      const shuffled = [...allGames].sort(() => Math.random() - 0.5)
      randomGames.value = shuffled.slice(0, 4)
    }
  })

  onMounted(async () => {
    const allVideos = dummyVideoList
    if (allVideos.length > 0) {
      // 랜덤 섞기 + 3개 선택
      const shuffled = [...allVideos].sort(() => Math.random() - 0.5)
      randomVideos.value = shuffled.slice(0, 3)
    }
  })
</script>

<style scoped>
  .main-image {
    width: 1440px;
    margin-top: 25px;
  }

  .container {
    width: 1220px;
    margin: 80px auto 0 auto;
    display: flex;
    flex-direction: column;
  }

  .container > div {
    display: flex;
    align-items: center;
  }

  .title {
    color: #2E2E2E;
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 1;
    margin-right: 11px;
  }

  .tag {
    color: #A0A0A0;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 14px;
  }

  .link {
    color: #5A5A5A;
    text-align: center;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    position: relative;
    top: 11px;
  }

  .triangle-right {
    width: 0;
    height: 0;
    border-top: 6.5px solid transparent;
    border-left: 13px solid #5A5A5A;
    border-bottom: 6.5px solid transparent;
    position: relative;
    top: 15px;
    margin-left: 4px;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    text-decoration: none;
  }

  .game-list {
    display: flex;
    flex-wrap: wrap;
    gap: 21px;
    margin-top: 30px;
  }

  .video-list {
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
    margin-top: 30px;
  }
</style>
