<!-- [FILEPATH] src/views/LoginView.vue -->
<template>
  <div class="login-container">
    <img src="@/assets/LoginBackGround.png" alt="배경" class="bg-image-element" />

    <div class="login-card">
      <Logo />
      <LoginForm />
      <Stamp />
      <LoginFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
// 아토믹 디자인으로 분리된 컴포넌트들을 가져옵니다.
import Logo from '@common/components/login/Logo.vue';
import LoginForm from '@common/components/login/LoginForm.vue';
import Stamp from '@common/components/login/Stamp.vue';
import LoginFooter from '@/common/components/login/LoginFooter.vue';
</script>

<style scoped>
/* 로그인 페이지 전체를 감싸는 컨테이너 */
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  /* 1. 남는 여백을 검은색으로 채웁니다. */
  background-color: black;
}

/* src/views/LoginView.vue의 <style scoped> 안 */

.bg-image-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* contain에서 다시 cover로 변경 */
  object-fit: cover; 
}

/* 로그인 카드 스타일 */
.login-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 537px;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  
  /* 3. 배경 이미지 위에 확실하게 올라오도록 설정합니다. */
  position: relative; 
  z-index: 1;
}
</style>