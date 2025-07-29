<!-- [FILEPATH] src/common/components/shared/BaseInput.vue -->
<!-- 상위 폴더에서 type="원하는거" placeholder='원하는거' 하면됨 -->
<template>
  <input :type="type" :placeholder="placeholder" class="base-input">
</template>

<script setup>
  defineProps (
    {
      type: String,
      placeholder: String
    }
  )
</script>

<style scoped>
  .base-input {
    width: 441px;
    height: 65px;
    border: 1px solid #A0A0A0;
    color: #A0A0A0;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-left: 18px;
  }
</style>