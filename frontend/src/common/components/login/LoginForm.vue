<!-- [FILEPATH] src/common/components/login/LoginForm.vue -->
<template>
  <form class="login-form" @submit.prevent>
    <input type="text" class="form-input" placeholder="아이디" />
    <input type="password" class="form-input" placeholder="비밀번호" />
    <button type="submit" class="login-button">로그인</button>
    <button type="button" @click="goToSignup" class="signup-link">회원가입</button>
  </form>
</template>

<script setup lang="ts">
// 2. vue-router를 가져옵니다
import { useRouter } from 'vue-router';

const router = useRouter();

// 3. '/terms' 경로로 이동하는 함수를 만듭니다
function goToSignup() {
  router.push('/terms');
}
</script>

<style scoped>
.login-form {
  width: 441px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-input {
  height: 65px;
  border: 1px solid #A0A0A0;
  padding: 0 20px;
  font-size: 16px;
  border-radius: 4px;
}

.form-input::placeholder {
  color: #A0A0A0;
}

.login-button {
  height: 73px;
  background-color: #F5E7DA;
  color: #2E2E2E;
  font-size: 20px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 40px;
}

/* 4. button을 a 태그처럼 보이도록 스타일을 추가/수정합니다 */
.signup-link {
  color: #2E2E2E;
  font-size: 15px;
  align-self: flex-start;
  margin-top: 15px;
  
  /* button 스타일 초기화 */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline; /* 링크처럼 보이게 */
}
</style>