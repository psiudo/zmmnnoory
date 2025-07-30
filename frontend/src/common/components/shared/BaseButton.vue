<!-- [FILEPATH] src/common/components/BaseButton.vue -->
<!-- 상위 폴더에서 @click-event 라고 쓰면 사용 가능 -->
<template>
  <button class="base-button" @click="$emit('clickEvent')">
    <slot></slot>
  </button>
</template>

<style scoped>
  .base-button {
    width: 441px;
    height: 73px;
    background: #F5E7DA;
    color: #2E2E2E;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
</style>
