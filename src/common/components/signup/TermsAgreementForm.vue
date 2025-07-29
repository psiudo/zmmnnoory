<!-- [FILEPATH] src/common/components/signup/TermsAgreementForm.vue -->
<template>
  <div class="form-container">
    <h2 class="title">다음 내용에 동의해주세요</h2>
    <div class="title-separator"></div>
    

    <!-- 모두 동의 -->
    <div class="all-agree-box">
      <input type="checkbox" class="checkbox-item" v-model="allChecked" />
      <div class="agree-text-group">
        <p class="agree-main-text">모두 동의</p>
        <p class="agree-sub-text">필수 및 선택 항목 동의 포함</p>
      </div>
    </div>

    <!-- 개별 약관 -->
    <div class="terms-list">
      <div class="term-item">
        <input type="checkbox" class="checkbox-item" v-model="terms.service" />
        <p class="term-text">서비스 이용 약관 동의 (필수)</p>
        <button type="button" class="view-btn" @click="openTerms('service')">보기</button>
      </div>
      <div class="separator"></div>

      <div class="term-item">
        <input type="checkbox" class="checkbox-item" v-model="terms.privacy" />
        <p class="term-text">개인정보 수집 및 이용 동의 (필수)</p>
        <button type="button" class="view-btn" @click="openTerms('privacy')">보기</button>
      </div>
      <div class="separator"></div>

      <div class="term-item">
        <input type="checkbox" class="checkbox-item" v-model="terms.faceData" />
        <p class="term-text">얼굴 데이터 수집 및 이용 동의 (필수)</p>
        <button type="button" class="view-btn" @click="openTerms('faceData')">보기</button>
      </div>
    </div>

    <button 
      class="submit-button" 
      @click="goToNextStep" 
      :disabled="!isAllRequiredAgreed"
    >
      다음
    </button>

    <!-- 모달 -->
    <div v-if="openedKey" class="modal-backdrop" @click.self="closeTerms">
      <div class="modal">
        <h3 class="modal-title">{{ titles[openedKey] }}</h3>
        <div class="modal-content">
          <pre>{{ contents[openedKey] }}</pre>
        </div>
        <button type="button" class="modal-close" @click="closeTerms">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'

const emit = defineEmits(['next-step'])

/** 개별 항목 상태 */
const terms = reactive({
  service: false,
  privacy: false,
  faceData: false,
})

/** 모두 동의 (파생 상태) */
const allChecked = computed({
  get: () => Object.values(terms).every(Boolean),
  set: (val) => {
    Object.keys(terms).forEach(k => { terms[k] = val })
  }
})

/** 필수 항목 모두 동의 여부 */
const isAllRequiredAgreed = computed(() => {
  return terms.service && terms.privacy && terms.faceData
})

function goToNextStep() {
  if (isAllRequiredAgreed.value) emit('next-step')
}

/* --------- 약관 보기 모달 --------- */
const openedKey = ref(null) // 'service' | 'privacy' | 'faceData' | null

const titles = {
  service: '서비스 이용 약관',
  privacy: '개인정보 수집 및 이용 동의',
  faceData: '얼굴 데이터 수집 및 이용 동의'
}

const contents = {
  service: 
  `서비스 이용약관 전문
  1. 목적 : 당신의 얼굴을 돈 주고 사겠어요.
  2. 이용자의 의무 : 한번 판 얼굴은 무르기 없기.
  `,
  privacy: 
  `개인정보 수집 및 이용 동의 전문
  1. 수집 항목 : 사용자의 사진 및 동영상
  2. 보유/이용 기간 : 2099.12.31
  `,
  faceData: 
  `얼굴 데이터 수집 및 이용 동의
  1. 수집 목적 : 동양인을 위해서
  2. 처리 방법 : 빅테크 기업에 팔겠어요.
  `
}

function openTerms(key) {
  openedKey.value = key
}
function closeTerms() {
  openedKey.value = null
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
}
.title {
  font-weight: 700;
  font-size: 40px;
  color: #2E2E2E;
  margin-bottom: 20px; /* ↓ 원래 50px → 20px로 줄임 */
}

.title-separator {
  width: 700px;
  height: 0.5px;
  background-color: #2E2E2E;
  margin-bottom: 30px; /* ↓ 구분선 아래 여백 보충 */
}

.all-agree-box {
  box-sizing: border-box;
  width: 100%;
  height: 73px;
  background: #F5E7DA;
  border: 1px solid #A0A0A0;
  display: flex;
  align-items: center;
  padding: 0 25px;
  margin-bottom: 40px;
}
.checkbox-item {
  width: 23px;
  height: 23px;
  border: 1px solid #A0A0A0;
  margin-right: 22px;
}
.agree-text-group {
  display: flex;
  align-items: baseline;
}
.agree-main-text {
  font-weight: 600;
  font-size: 20px;
  color: #2E2E2E;
  margin-right: 12px;
}
.agree-sub-text {
  font-weight: 400;
  font-size: 15px;
  color: #2E2E2E;
}
.terms-list {
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
.term-item {
  display: flex;
  align-items: center;
  height: 78px;
  gap: 12px;
}
.term-text {
  flex: 1;
  font-weight: 400;
  font-size: 20px;
  color: #2E2E2E;
}
.view-btn {
  border: 1px solid #A0A0A0;
  background: #FFFFFF;
  padding: 4px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  flex-shrink: 0;
}
.separator {
  width: 100%;
  height: 1px;
  background-color: #A0A0A0;
  border: none;
}
.submit-button {
  width: 441px;
  height: 73px;
  background: #F5E7DA;
  border: 1px solid #A0A0A0;
  font-weight: 700;
  font-size: 20px;
  color: #2E2E2E;
  cursor: pointer;
  margin-top: 40px;
}
.submit-button:disabled {
  background-color: #E0E0E0;
  cursor: not-allowed;
  color: #A0A0A0;
}

/* ---------- 모달 스타일 ---------- */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal {
  width: 680px;
  max-width: calc(100% - 40px);
  max-height: calc(100% - 80px);
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  padding: 32px 28px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #2E2E2E;
  margin-bottom: 16px;
}
.modal-content {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
  margin-bottom: 20px;
}
.modal-content pre {
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 15px;
  color: #333;
}
.modal-close {
  align-self: flex-end;
  border: 1px solid #A0A0A0;
  background: #F5E7DA;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 15px;
  cursor: pointer;
}
</style>
