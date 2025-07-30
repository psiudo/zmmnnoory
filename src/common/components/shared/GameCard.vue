<template>
  <RouterLink :to="{name: 'GameDetail', params: { id: game.id }}" style="text-decoration: none;">
    <div class="game-info">
      <img :src="game.thumbnail" alt="thumbnail">
      <span class="game-title">{{ game.title }} ({{ game.difficulty }})</span>
      <span class="game-datatype">{{ game.require_data_type }}</span>
      <div class="game-point">
        <span>{{ game.point }}</span>
        <img src="@/assets/currency_symbol.png" alt="point symbol" />
      </div>
      <div class="participate" :class="{ done: participationStatus === 'COMPLETED', undone: participationStatus === 'NOT_PARTICIPATED' }">
        <span>{{ participationStatus === 'COMPLETED' ? '참여완료' : '미참여' }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  import type { Game } from '@/services/info'

  defineProps<{
    game: Game
    participationStatus: 'COMPLETED' | 'NOT_PARTICIPATED'
  }>()
</script>

<style scoped>
  .game-info {
    width: 289px;
    height: 265px;
    flex-shrink: 0;
    background: #F5F5F5;
    display: flex;
    flex-direction: column;
    align-items: start;
    filter: drop-shadow(0 5px 30px rgba(0, 0, 0, 0.25));
    position: relative;
  }

  .game-info img {
    width: 100%;
  }

  .game-title {
    color: #2E2E2E;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 3px 0 0 10px;
  }

  .game-datatype {
    color: #2E2E2E;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 10px;
  }
  
  .participate {
    position: absolute;
    right: 6px;
    bottom: 6px;
    width: 62px;
    height: 20px;
    flex-shrink: 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .participate.done {
    background: #00D722;
  }

  .participate.undone {
    background: #E81313;
  }

  .participate span {
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .game-point {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-top: 2px;
    gap: 4px;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #2E2E2E;
  }

  .game-point img {
    width: 13px;
    height: 13px;
  }
</style>