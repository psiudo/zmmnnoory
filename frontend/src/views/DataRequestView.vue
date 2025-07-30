<template>
  <div class="data-request-view">
    <div class="card-modal">
      <div class="card-title">
        <img src="@/assets/logo_big.png" alt="데이터 요청" />
      </div>
      <form class="data-request-form">
        <input
          type="text"
          placeholder="기업명"
          class="form-input"
        />
        <input
          type="email"
          placeholder="연락처"
          class="form-input"
        />
        <textarea
          placeholder="필요 데이터 정보"
          rows="6"
          class="form-textarea"
        ></textarea>
        <BaseButton
          type="submit"
          class="base-button"
        >
          신청하기
        </BaseButton>
        <div class="footer-container">
          <img src="@/assets/stamp.png" alt="stamp" class="stamp-image"></img>
          <LoginFooter />  
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoginFooter from '@/common/components/login/LoginFooter.vue';
import BaseButton from '@/common/components/shared/BaseButton.vue';
</script>
<style scoped>
.data-request-view {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/data-request-bg.png'); /* 배경 이미지 변경 부분 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.data-request-view > .card-modal {
  position: relative;
  z-index: 1;
  /* 모달에는 필터 적용 안함 */
}

.card-modal {
  width: 30vw;
  height: 80vh;
  max-width: 90vw;
  max-height: 90vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 1vw 4vw rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-title {
  margin-bottom: 24px;
  font-size: 2rem;
  font-weight: 700;
  position: relative;
}
.card-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #2e2e2e;
  position: absolute;
  left: 0;
  bottom: -5px;
}

.card-desc {
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  margin-bottom: 32px;
}

.data-request-form {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.form-textarea {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  resize: none;
}

.base-button {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
}
.footer-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.site-footer {
  width: 100%;
}
</style>