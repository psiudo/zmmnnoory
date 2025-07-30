<!-- [FILEPATH] src/common/components/signup/TermsModal.vue -->
<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <pre class="terms-text">{{ content }}</pre>
      <button @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.terms-text {
  white-space: pre-wrap; /* 줄바꿈을 그대로 표시 */
  word-wrap: break-word;
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 4px;
  height: 300px;
  overflow-y: auto; /* 내용이 길면 스크롤 */
  font-family: inherit;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
}
</style>