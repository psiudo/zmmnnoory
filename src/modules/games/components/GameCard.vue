<!-- [FILEPATH] src/modules/games/components/GameCard.vue -->
<template>
  <router-link :to="{ name: 'GameDetail', params: { id: game.id } }" class="game-card-link">
    <div class="game-card">
      <img :src="getGameImage(game.imageKey)" :alt="game.title" class="card-thumbnail" />
      <div class="card-info">
        <span class="card-category">{{ game.category }}</span>
        <h3 class="card-title">{{ game.title }}</h3>
        <div class="card-footer">
          <span>보상: {{ game.reward }}P</span>
          <span :class="['status-badge', game.status]">{{ game.status }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Game } from '@/services/games'
import { getGameImage } from '@/assets/gameImages'

defineProps<{
  game: Game
}>()
</script>


<style scoped>
/* [수정] a 태그의 기본 스타일을 제거합니다 */
.game-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease-in-out;
}
.game-card-link:hover {
  transform: translateY(-5px);
}

.game-card {
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.card-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  background-color: #f0f0f0;
}

.card-info {
  padding: 16px;
}

.card-category {
  font-size: 12px;
  color: #666;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 4px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}
.status-badge.참여완료 { background-color: #e0f2f1; color: #00796b; }
.status-badge.미참여 { background-color: #fce4ec; color: #c2185b; }
.status-badge.심사중 { background-color: #fff3e0; color: #f57c00; }
</style>