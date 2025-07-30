<!-- [FILEPATH] src/common/components/signup/SignupForm.vue -->
<template>
  <div class="signup-form-container">
    <h2 class="title">기본 정보 입력</h2>
    <div class="title-separator"></div>

    <form @submit.prevent="submitForm" class="form">
      <!-- 닉네임 -->
      <div class="form-group">
        <div class="input-with-button">
          <input
            type="text"
            id="nickname"
            placeholder="닉네임"
            v-model.trim="form.nickname"
            :class="{ 'input-invalid': errors.nickname }"
            @input="onNicknameTyping()"
            @blur="touched.nickname = true; validateNickname()"
          />
          <button
            type="button"
            class="check-button small-btn"
            @click="checkNickname"
            :disabled="!isNicknameFormatValid || nicknameStatus === STATUS.CHECKING"
          >
            {{ nicknameStatus === STATUS.CHECKING ? '확인중...' : '중복확인' }}
          </button>
        </div>

        <!-- 우선순위: error > taken > available > (형식 OK & touched) > helper -->
        <template v-if="errors.nickname">
          <p class="error-text">{{ errors.nickname }}</p>
        </template>
        <template v-else-if="nicknameStatus === STATUS.TAKEN">
          <p class="error-text">이미 사용 중인 닉네임입니다.</p>
        </template>
        <template v-else-if="nicknameStatus === STATUS.AVAILABLE">
          <p class="success-text">사용 가능한 닉네임입니다.</p>
        </template>
        <template v-else-if="touched.nickname && isNicknameFormatValid">
          <p class="success-text">형식이 올바릅니다. 중복확인을 진행해주세요.</p>
        </template>
        <template v-else>
          <p class="helper-text">{{ HELPERS.nickname }}</p>
        </template>
      </div>

      <!-- 생년월일 + 성별 -->
      <div class="form-group">
        <div class="input-with-button">
          <input
            type="text"
            id="birthdate"
            placeholder="생년월일 (ex. 000101)"
            class="birthdate-input"
            v-model.trim="form.birthdate"
            :class="{ 'input-invalid': errors.birthdate }"
            @input="validateBirthdate()"
            @blur="touched.birthdate = true; validateBirthdate()"
          />

          <button
            type="button"
            class="gender-button"
            :class="{ active: form.gender === '남' }"
            @click="form.gender = '남'"
          >남</button>

          <button
            type="button"
            class="gender-button"
            :class="{ active: form.gender === '여' }"
            @click="form.gender = '여'"
          >여</button>
        </div>
        <template v-if="errors.birthdate">
          <p class="error-text">{{ errors.birthdate }}</p>
        </template>
        <template v-else-if="touched.birthdate && form.birthdate && !errors.birthdate">
          <p class="success-text">형식이 올바릅니다.</p>
        </template>
        <template v-else>
          <p class="helper-text">{{ HELPERS.birthdate }}</p>
        </template>
      </div>

      <!-- 이메일 -->
      <div class="form-group">
        <div class="input-with-button">
          <input
            type="email"
            id="email"
            placeholder="아이디 (이메일)"
            v-model.trim="form.email"
            :class="{ 'input-invalid': errors.email }"
            @input="onEmailTyping()"
            @blur="touched.email = true; validateEmail()"
          />
          <button
            type="button"
            class="check-button"
            @click="checkEmail"
            :disabled="!isEmailFormatValid || emailStatus === STATUS.CHECKING"
          >
            {{ emailStatus === STATUS.CHECKING ? '확인중...' : '중복확인' }}
          </button>
        </div>

        <!-- 우선순위: error > taken > available > (형식 OK & touched) > helper -->
        <template v-if="errors.email">
          <p class="error-text">{{ errors.email }}</p>
        </template>
        <template v-else-if="emailStatus === STATUS.TAKEN">
          <p class="error-text">이미 사용 중인 이메일입니다.</p>
        </template>
        <template v-else-if="emailStatus === STATUS.AVAILABLE">
          <p class="success-text">사용 가능한 이메일입니다.</p>
        </template>
        <template v-else-if="touched.email && isEmailFormatValid">
          <p class="success-text">형식이 올바릅니다. 중복확인을 진행해주세요.</p>
        </template>
        <template v-else>
          <p class="helper-text">{{ HELPERS.email }}</p>
        </template>
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <div class="input-with-button">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="비밀번호"
            v-model="form.password"
            :class="{ 'input-invalid': errors.password }"
            @input="validatePassword()"
            @blur="touched.password = true; validatePassword()"
          />
          <button
            type="button"
            class="check-button small-btn"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? '숨기기' : '보기' }}
          </button>
        </div>

        <template v-if="errors.password">
          <p class="error-text">{{ errors.password }}</p>
        </template>
        <template v-else-if="touched.password && form.password && !errors.password">
          <p class="success-text">조건을 모두 만족합니다.</p>
        </template>
        <template v-else>
          <p class="helper-text">{{ HELPERS.password }}</p>
        </template>
      </div>

      <!-- 비밀번호 확인 -->
      <div class="form-group">
        <input
          :type="showPassword ? 'text' : 'password'"
          id="passwordConfirm"
          placeholder="비밀번호 확인"
          v-model="form.passwordConfirm"
          :class="{ 'input-invalid': errors.passwordConfirm }"
          @input="validatePasswordConfirm()"
          @blur="touched.passwordConfirm = true; validatePasswordConfirm()"
        />
        <template v-if="errors.passwordConfirm">
          <p class="error-text">{{ errors.passwordConfirm }}</p>
        </template>
        <template v-else-if="touched.passwordConfirm && form.passwordConfirm && !errors.passwordConfirm">
          <p class="success-text">비밀번호가 일치합니다.</p>
        </template>
        <template v-else>
          <p class="helper-text">{{ HELPERS.passwordConfirm }}</p>
        </template>
      </div>

      <button
        type="submit"
        class="submit-button"
        :disabled="!canSubmit"
      >회원가입</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { REGEX, HELPERS, STATUS, type Status } from '@/constants/form'
import { checkEmailAPI, checkNicknameAPI, signupAPI } from '@/services/auth'

/* ---------- 상태 ---------- */
const form = reactive({
  nickname: '',
  birthdate: '',
  gender: '남',
  email: '',
  password: '',
  passwordConfirm: ''
})

const errors = reactive({
  nickname: '',
  birthdate: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

const touched = reactive({
  nickname: false,
  birthdate: false,
  email: false,
  password: false,
  passwordConfirm: false
})

const showPassword = ref(false)
const emailStatus = ref<Status>(STATUS.IDLE)
const nicknameStatus = ref<Status>(STATUS.IDLE)

/* ---------- 검증 함수 ---------- */
function validateNickname() {
  if (!form.nickname) {
    errors.nickname = '닉네임을 입력해야 합니다.'
  } else if (!REGEX.nickname.test(form.nickname)) {
    errors.nickname = '8자 이내, 특수문자를 제외해야 합니다.'
  } else {
    errors.nickname = ''
  }
}

function validateBirthdate() {
  form.birthdate = form.birthdate.replace(/\D/g, '').slice(0, 6)
  if (!form.birthdate) {
    errors.birthdate = '생년월일을 입력해야 합니다.'
  } else if (!REGEX.birth.test(form.birthdate)) {
    errors.birthdate = 'YYMMDD 형식 6자리여야 합니다.'
  } else {
    errors.birthdate = ''
  }
}

function validateEmail() {
  if (!form.email) {
    errors.email = '이메일을 입력해야 합니다.'
  } else if (!REGEX.email.test(form.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  } else {
    errors.email = ''
  }
}

function validatePassword() {
  if (!form.password) {
    errors.password = '비밀번호를 입력해야 합니다.'
  } else if (!REGEX.password.test(form.password)) {
    errors.password = '영문, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.'
  } else {
    errors.password = ''
  }
  validatePasswordConfirm()
}

function validatePasswordConfirm() {
  if (!form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호 확인을 입력해야 합니다.'
  } else if (form.password !== form.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
  } else {
    errors.passwordConfirm = ''
  }
}

/* ---------- 중복확인 로직 ---------- */
const isEmailFormatValid = computed(() => REGEX.email.test(form.email))
const isNicknameFormatValid = computed(() => REGEX.nickname.test(form.nickname))

function onEmailTyping() {
  emailStatus.value = STATUS.IDLE
  validateEmail()
}
function onNicknameTyping() {
  nicknameStatus.value = STATUS.IDLE
  validateNickname()
}

async function checkEmail() {
  validateEmail()
  if (errors.email) return
  emailStatus.value = STATUS.CHECKING
  try {
    const ok = await checkEmailAPI(form.email)
    emailStatus.value = ok ? STATUS.AVAILABLE : STATUS.TAKEN
  } catch (e) {
    emailStatus.value = STATUS.IDLE
    errors.email = '서버 오류입니다. 잠시 후 다시 시도해주세요.'
  }
}

async function checkNickname() {
  validateNickname()
  if (errors.nickname) return
  nicknameStatus.value = STATUS.CHECKING
  try {
    const ok = await checkNicknameAPI(form.nickname)
    nicknameStatus.value = ok ? STATUS.AVAILABLE : STATUS.TAKEN
  } catch (e) {
    nicknameStatus.value = STATUS.IDLE
    errors.nickname = '서버 오류입니다. 잠시 후 다시 시도해주세요.'
  }
}

/* ---------- 제출 가능 여부 ---------- */
const canSubmit = computed(() => {
  return (
    !errors.nickname &&
    !errors.birthdate &&
    !errors.email &&
    !errors.password &&
    !errors.passwordConfirm &&
    form.nickname &&
    form.birthdate &&
    form.email &&
    form.password &&
    form.passwordConfirm &&
    emailStatus.value === STATUS.AVAILABLE &&
    nicknameStatus.value === STATUS.AVAILABLE
  )
})

/* ---------- 제출 ---------- */
const submitForm = async () => {
  validateNickname()
  validateBirthdate()
  validateEmail()
  validatePassword()
  validatePasswordConfirm()

  touched.nickname = touched.birthdate = touched.email = touched.password = touched.passwordConfirm = true

  if (!canSubmit.value) return

  try {
    await signupAPI({
      nickname: form.nickname,
      birthdate: form.birthdate,
      gender: form.gender,
      email: form.email,
      password: form.password
    })
    alert('가입이 완료되었습니다.')
    // 필요하면 router.push('/login')
  } catch (e) {
    alert('서버 오류입니다. 잠시 후 다시 시도해주세요.')
  }
}

/* ---------- 입력 변경 시 상태 초기화 ---------- */
watch(() => form.email, () => { emailStatus.value = STATUS.IDLE })
watch(() => form.nickname, () => { nicknameStatus.value = STATUS.IDLE })
</script>

<style scoped>
.signup-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter', sans-serif;
  color: #2E2E2E;
  width: 100%;
}
.title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 25px;
}
.title-separator {
  width: 600px;
  height: 0.5px;
  background-color: #2E2E2E;
  margin-bottom: 44px;
}

/* 간격 일정화 */
.form {
  width: 100%;
  max-width: 441px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group input {
  height: 60px;
  padding: 0 16px;
  border: 1px solid #A0A0A0;
  border-radius: 0;
  font-size: 18px;
  line-height: 1.2;
}
.form-group input::placeholder {
  color: #A0A0A0;
  font-weight: 400;
}

.helper-text,
.error-text,
.success-text {
  font-size: 12.5px;
  line-height: 1.35;
  margin-top: 0;
  padding-left: 4px;
}
.error-text { color: #E53935; }
.success-text { color: #2E7D32; }

.input-with-button {
  display: flex;
  gap: 8px;
}
.input-with-button input {
  flex-grow: 1;
  width: 100%;
}

.check-button {
  flex-shrink: 0;
  width: 110px;
  height: 60px;
  background: #F5E7DA;
  border: 1px solid #A0A0A0;
  border-radius: 0;
  font-weight: 600;
  font-size: 18px;
  color: #2E2E2E;
  cursor: pointer;
}
.check-button.small-btn { width: 90px; }
.check-button:disabled { opacity: 0.5; cursor: not-allowed; }

.birthdate-input { flex-grow: 1; }

.gender-button {
  flex-shrink: 0;
  width: 56px;
  height: 60px;
  border: 1px solid #A0A0A0;
  border-radius: 0;
  background: #FFFFFF;
  font-weight: 600;
  font-size: 18px;
  color: #2E2E2E;
  cursor: pointer;
  line-height: 1;
}
.gender-button.active { background: #F5E7DA; }

.submit-button {
  width: 100%;
  height: 68px;
  background: #F5E7DA;
  border: 1px solid #A0A0A0;
  border-radius: 0;
  font-weight: 700;
  font-size: 19px;
  color: #2E2E2E;
  cursor: pointer;
  margin-top: 6px;
}
.submit-button:disabled { opacity: 0.5; cursor: not-allowed; }

.input-invalid { border-color: #E53935; }
</style>
