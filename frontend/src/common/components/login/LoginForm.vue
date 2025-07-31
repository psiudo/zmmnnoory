<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <input type="text" class="form-input" v-model="email" placeholder="아이디" />
    <input type="password" class="form-input" v-model="password" placeholder="비밀번호" />

    <button type="submit" class="login-button">로그인</button>
    <button type="button" @click="goToSignup" class="signup-link">회원가입</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 1. vue-router에서 useRouter를 가져옵니다.
import { useAccountStore } from '@/store/Accounts'

const store = useAccountStore()
const router = useRouter() // 2. router를 사용할 수 있게 준비합니다.

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('이메일과 비밀번호를 입력해주세요.')
    return
  }

  await store.login({
    email: email.value,
    password: password.value,
  })
}

// 3. goToSignup 함수를 만듭니다.
const goToSignup = () => {
  router.push('/terms')
}
</script>

<style scoped>
/* 스타일 코드는 그대로 유지 */
.login-form {
  width: 441px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-input {
  height: 65px;
  border: 1px solid #a0a0a0;
  padding: 0 20px;
  font-size: 16px;
  border-radius: 4px;
}

.form-input::placeholder {
  color: #a0a0a0;
}

.login-button {
  height: 73px;
  background-color: #f5e7da;
  color: #2e2e2e;
  font-size: 20px;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 40px;
}

.signup-link {
  color: #2e2e2e;
  font-size: 15px;
  align-self: flex-start;
  margin-top: 15px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
}
</style>