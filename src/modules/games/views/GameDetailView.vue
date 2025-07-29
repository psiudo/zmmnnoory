<!-- [FILEPATH] src/modules/games/views/GameDetailView.vue -->
<template>
  <div class="game-detail-page">
    <AppHeader />
    <main class="container" v-if="game">
      <section class="game-main-section">
        <div class="thumbnail-wrapper">
          <img :src="getGameImage(game.imageKey)" :alt="game.title" class="main-thumbnail" />
        </div>

        <div class="info-wrapper">
          <h1 class="game-title">{{ game.title }}</h1>

          <div class="game-meta-simple">
            <span>제작자: <strong>{{ game.creator }}</strong></span>
            <span class="meta-separator">|</span>
            <span>플레이: <strong>{{ game.playCount }}</strong></span>
          </div>

          <p class="game-description">{{ game.description }}</p>
          
          <div class="meta-info-wrapper">
            <div class="full-width">
              <h3 class="meta-title">게임 방법</h3>
              <p class="meta-content">게임 화면의 이모지를 보고 표정을 바꾸면 됩니다.</p>
            </div>
            
            <h3 class="meta-title">난이도</h3>
            <p class="meta-content">{{ game.difficulty }}</p>

            <h3 class="meta-title">리워드</h3>
            <p class="meta-content">{{ game.reward }}P</p>
          </div>
          
          <button class="play-button">게임 시작</button>
        </div>
      </section>

      <div class="separator"></div>

      <section class="similar-games-section">
        <h2 class="section-title">비슷한 게임</h2>
        <div class="grid" v-if="similarGames.length > 0">
          <GameCard v-for="g in similarGames" :key="g.id" :game="g" />
        </div>
        <p v-else>비슷한 게임이 없습니다.</p>
      </section>
    </main>
    
    <div v-else class="loading-container">
      <p>게임을 불러오는 중입니다...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '@/common/components/shared/AppHeader.vue'
import GameCard from '../components/GameCard.vue'
import { fetchGameById, fetchSimilarGames, type Game } from '@/services/games'
import { getGameImage } from '@/assets/gameImages'

const props = defineProps<{
  id: string
}>()

const game = ref<Game | null>(null)
const similarGames = ref<Game[]>([])

onMounted(async () => {
  try {
    const [gameData, similarGamesData] = await Promise.all([
      fetchGameById(props.id),
      fetchSimilarGames(props.id)
    ])
    game.value = gameData
    similarGames.value = similarGamesData
  } catch (error) {
    console.error('Failed to load game details:', error)
  }
})
</script>

<style scoped>
/* 페이지 기본 설정 */
.game-detail-page {
  background-color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  color: #2E2E2E;
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 40px;
}

/* 상단 메인 섹션 */
.game-main-section {
  display: flex;
  align-items: flex-start;
  gap: 80px;
  margin-bottom: 80px;
}

/* 왼쪽 썸네일 */
.thumbnail-wrapper {
  width: 55%;
  flex-shrink: 0;
}
.main-thumbnail {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
  background-color: #f0f0f0;
}

/* 오른쪽 정보 영역 */
.info-wrapper {
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.game-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px;
}
.game-meta-simple {
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #888;
  margin-bottom: 24px;
}
.meta-separator {
  color: #e0e0e0;
}
.game-description {
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 40px;
}

/* 상세 정보 (게임 방법, 난이도 등) */
.meta-info-wrapper {
  width: 100%;
  padding: 32px;
  background-color: #FAFAFA;
  border-radius: 8px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px 20px;
  align-items: center;
}
.meta-title {
  font-weight: 600;
  font-size: 15px;
  color: #333;
  margin: 0;
}
.meta-content {
  font-size: 15px;
  font-weight: 400;
  color: #555;
}
.full-width {
  grid-column: 1 / -1;
}
.full-width > .meta-title {
  margin-bottom: 8px;
}

/* 게임 시작 버튼 */
.play-button {
  width: 100%;
  padding: 18px 0;
  font-size: 18px;
  font-weight: 600;
  background-color: #F5E7DA;
  color: #2E2E2E;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto;
}
.play-button:hover {
  background-color: #e4d5c8;
}

/* 구분선 및 하단 섹션 */
.separator {
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin-bottom: 60px;
}
.similar-games-section {
  text-align: left;
}
.section-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 90px);
}
</style>