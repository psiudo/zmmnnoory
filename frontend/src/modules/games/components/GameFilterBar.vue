<!-- [FILEPATH] src/modules/games/components/GameFilterBar.vue -->
<template>
  <div class="filter-wrap">
    <div class="search-segment">
      <input
        v-model.trim="keywordLocal"
        class="search-input"
        placeholder="검색어 입력"
        @keyup.enter="emitSearch"
      />
    </div>

    <div class="divider"></div>

    <div
      class="select-box difficulty"
      :class="{ active: open.difficulty }"
      @click="toggle('difficulty')"
    >
      <label>난이도</label>
      <span class="placeholder">
        {{ difficultyLabel || '난이도 선택' }}
      </span>
      <ul v-if="open.difficulty" class="dropdown" @click.stop>
        <li
          v-for="opt in difficulties"
          :key="opt.value"
          @click="selectDifficulty(opt.value)"
        >
          {{ opt.label }}
        </li>
      </ul>
    </div>

    <div class="divider"></div>

    <div
      class="select-box reward"
      :class="{ active: open.reward }"
      @click="toggle('reward')"
    >
      <label>보상</label>
      <span class="placeholder">
        {{ rewardLabel || '총 보상 선택' }}
      </span>
      <div v-if="open.reward" class="dropdown reward-dropdown" @click.stop>
        <div class="reward-row">
          <span class="reward-label">최소 보상</span>
          <div class="reward-control">
            <button @click="decrement('min')">-</button>
            <input type="number" class="reward-input" v-model="minReward" :step="rewardStep" />
            <button @click="increment('min')">+</button>
          </div>
        </div>
        <div class="reward-divider"></div>
        <div class="reward-row">
          <span class="reward-label">최대 보상</span>
          <div class="reward-control">
            <button @click="decrement('max')">-</button>
            <input type="number" class="reward-input" v-model="maxReward" :step="rewardStep" />
            <button @click="increment('max')">+</button>
          </div>
        </div>
      </div>
    </div>

    <button class="search-btn" @click="emitSearch">
      <img src="@/assets/search-icon.png" alt="검색" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { DIFFICULTIES } from '@/constants/games'

const props = defineProps<{
  keyword: string
  difficulty: string | null
  reward: string | null
}>()

const emit = defineEmits<{
  (e: 'update:keyword', v: string): void
  (e: 'update:difficulty', v: string | null): void
  (e: 'update:reward', v: string | null): void
  (e: 'search'): void
}>()

const keywordLocal = ref(props.keyword)
watch(keywordLocal, v => emit('update:keyword', v))
watch(() => props.keyword, v => (keywordLocal.value = v))

const open = ref({ difficulty: false, reward: false })

function toggle(w: 'difficulty' | 'reward') {
  const wasOpen = open.value[w];
  open.value.difficulty = false;
  open.value.reward = false;
  
  if (!wasOpen) {
    open.value[w] = true;
  }
}

const difficulties = DIFFICULTIES
const difficultyLabel = computed(() =>
  difficulties.find(d => d.value === props.difficulty)?.label
)
function selectDifficulty(v: string) {
  emit('update:difficulty', v)
  open.value.difficulty = false
}

// [수정] 보상 필터 로직 및 검증 추가
const rewardStep = 100;
const minReward = ref(0)
const maxReward = ref(1000)

function increment(type: 'min' | 'max') {
  if (type === 'min') {
    minReward.value += rewardStep;
  } else {
    maxReward.value += rewardStep;
  }
}
function decrement(type: 'min' | 'max') {
  if (type === 'min' && minReward.value >= rewardStep) {
    minReward.value -= rewardStep;
  } else if (type === 'max' && maxReward.value >= rewardStep) {
    // 최대 보상이 최소 보상보다 작아지지 않도록 방지
    if (maxReward.value - rewardStep >= minReward.value) {
      maxReward.value -= rewardStep;
    }
  }
}

// 최소/최대 보상 값이 서로를 넘지 않도록 감시
watch(minReward, (newMin) => {
  if (newMin > maxReward.value) {
    maxReward.value = newMin;
  }
});
watch(maxReward, (newMax) => {
  if (newMax < minReward.value) {
    minReward.value = newMax;
  }
});

const rewardLabel = computed(() => {
  if (minReward.value === 0 && maxReward.value === 1000) return ''
  return `${minReward.value} - ${maxReward.value}`
})
watch([minReward, maxReward], () => {
  emit('update:reward', `${minReward.value}-${maxReward.value}`)
})

function emitSearch() {
  emit('search')
}

function onDocClick(e: MouseEvent) {
  if (!(e.target as HTMLElement).closest('.filter-wrap')) {
    open.value.difficulty = false;
    open.value.reward = false;
  }
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.filter-wrap {
  width: 898px; max-width: 100%; height: 75px; margin: 0 auto 40px;
  background: #F5F5F5; border: 1px solid #2E2E2E;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25), inset 2px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 45px; display: flex; align-items: stretch; /* stretch로 변경 */
  padding: 0 10px 0 30px; /* 패딩 조정 */
  box-sizing: border-box;
}

/* [수정] 검색어와 난이도/보상 영역을 명확히 구분 */
.search-segment, .select-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  cursor: pointer;
}
.search-segment {
  flex: 1; /* 남는 공간 모두 차지 */
}
.select-box {
  width: auto; /* 너비 자동 조정 */
  padding: 0 45px; /* 내부 좌우 여백 */
  z-index: 1;
}

.search-input {
  border: none; outline: none; font-size: 20px; color: #2e2e2e;
  background: transparent; width: 100%;
}
.search-input::placeholder { color: #a0a0a0; }
.divider { width: 1px; height: 45px; background: #A0A0A0; margin: auto 0; }

.select-box label, .select-box .placeholder { position: relative; z-index: 2; }
.select-box label {
  font-size: 16px; color: #2e2e2e; font-weight: 400; line-height: 1; margin-bottom: 4px;
}
.select-box .placeholder {
  font-size: 20px; font-weight: 400; line-height: 24px; color: #a0a0a0;
}

/* [수정] 활성화 배경 크기 및 위치 미세 조정 */
.select-box.active::before {
  content: ''; position: absolute;
  top: 0px; bottom: 0px; left: -12px; right: -12px;
  background: #F9F1E9; border-radius: 45px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  z-index: -1;
  border: 1px solid #2E2E2E; 
}

.dropdown {
  position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
  width: 213px; background: #F9F1E9; border: 1px solid #2E2E2E;
  border-radius: 30px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  padding: 10px 0; z-index: 10; list-style: none; margin: 0; overflow: hidden;
}
.dropdown li {
  padding: 16px 24px; font-size: 20px; font-weight: 600; color: #2e2e2e;
  cursor: pointer; text-align: center; border-top: 1px solid #DCDCDC;
  transition: background-color 0.2s;
}
.dropdown li:first-child { border-top: none; }
.dropdown li:hover { background: #f5e7da; }

.search-btn {
  width: 43px; height: 43px; background: #F5E7DA; border: none; border-radius: 50%;
  cursor: pointer; flex-shrink: 0; margin: auto 0 auto 16px; display: flex;
  align-items: center; justify-content: center; padding: 0;
}
.search-btn img { width: 24px; height: 24px; }

/* [수정] 보상 드롭다운 UI 개선 */
.reward-dropdown {
  width: 300px; padding: 24px; box-sizing: border-box;
}
.reward-row {
  display: flex; justify-content: space-between; align-items: center;
}
.reward-label {
  font-size: 20px; font-weight: 600; flex-grow: 1; /* 라벨이 남는 공간 차지 */
}
.reward-divider {
  height: 1px; background-color: #A0A0A0; margin: 16px 0;
}
.reward-control {
  display: flex; align-items: center; gap: 12px;
}
.reward-control button {
  width: 31px; height: 31px; border: 1px solid #A0A0A0; background: #FFFFFF;
  border-radius: 50%; font-size: 20px; color: #A0A0A0; cursor: pointer;
  display: flex; align-items: center; justify-content: center; line-height: 1;
}
.reward-input {
  width: 60px; border: 1px solid #DCDCDC; border-radius: 4px;
  text-align: center; font-size: 15px; font-weight: 400; color: #2E2E2E;
}
.reward-input::-webkit-outer-spin-button, .reward-input::-webkit-inner-spin-button {
  -webkit-appearance: none; margin: 0;
}
.reward-input { -moz-appearance: textfield; }
</style>