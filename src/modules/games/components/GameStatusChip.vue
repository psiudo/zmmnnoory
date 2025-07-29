<!-- [FILEPATH] src/modules/games/components/GameStatusChip.vue -->
<template>
  <span :class="['chip', statusClass]">{{ status }}</span>
</template>

<script setup lang="ts">
import type { GameStatus } from '@/constants/games'

const props = defineProps<{ status: GameStatus }>()

const statusClass = (() => {
  switch (props.status) {
    case '참여완료': return 'done'
    case '미참여':   return 'not'
    case '심사중':   return 'pending'
    default:         return ''
  }
})()
</script>

<style scoped>
.chip{
  display:inline-flex;align-items:center;justify-content:center;
  height:20px;padding:0 10px;border-radius:8px;font-size:12px;line-height:15px;color:#fff;
}
.done{background:#00D722;}
.not{background:#E81313;}
.pending{background:#FFCA10;}
</style>
