<template>
  <div class="games-page">
    <AppHeader />

    <main class="container">
      <GameFilterBar
        v-model:keyword="filters.keyword"
        v-model:difficulty="filters.difficulty"
        v-model:reward="filters.reward"
        @search="loadGames"
      />

      <section class="grid">
        <GameCard v-for="g in filteredGames" :key="g.id" :game="g" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@common/components/shared/AppHeader.vue'
import GameFilterBar from '../components/GameFilterBar.vue'
import GameCard from '../components/GameCard.vue'

import { ref, computed, onMounted } from 'vue'
import { fetchGames, type Game } from '@/services/games'
// 32번째 줄: 이 import를 삭제합니다.
// import { DIFFICULTIES } from '@/constants/games' // <-- 이 줄을 완전히 삭제

const games = ref<Game[]>([])
const filters = ref({
  keyword: '',
  difficulty: null as string | null,
  reward: null as string | null
})

// 'difficultyLabel'이 현재 템플릿에서 사용되지 않으므로, TS6133 오류 방지를 위해 임시로 주석 처리합니다.
// 나중에 템플릿에서 이 값을 사용할 때 주석을 해제하세요.
// const difficultyLabel = computed(
//   () => DIFFICULTIES.find(d => d.value === filters.value.difficulty)?.label // DIFFICULTIES가 이제는 undefined가 될 것이므로 이 줄은 의미가 없으나, 주석처리 되어 있으니 문제 없음
// )

async function loadGames() {
  games.value = await fetchGames({
    keyword: filters.value.keyword || undefined,
    difficulty: filters.value.difficulty || undefined,
    reward: filters.value.reward || undefined
  })
}

const filteredGames = computed(() => {
  return games.value.filter(g => {
    const k = filters.value.keyword.toLowerCase()
    const matchKeyword =
      !k || g.title.toLowerCase().includes(k) || g.category.toLowerCase().includes(k)

    const matchDiff =
      !filters.value.difficulty || g.difficulty === filters.value.difficulty

    const matchReward = (() => {
      const r = filters.value.reward
      if (!r) return true
      if (r === '0-50')   return g.reward <= 50
      if (r === '51-100') return g.reward >= 51 && g.reward <= 100
      if (r === '101+')   return g.reward >= 101
      return true
    })()

    return matchKeyword && matchDiff && matchReward
  })
})

onMounted(loadGames)
</script>

<style scoped>
.games-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 40px 80px;
  box-sizing: border-box;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #2E2E2E;
  margin: 0 0 28px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px 32px;
  justify-items: center;
}
</style>