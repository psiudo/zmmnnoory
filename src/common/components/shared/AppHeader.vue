<!-- [FILEPATH] src/common/components/shared/AppHeader.vue -->
<template>
  <div class="header-wrapper">
    <header class="app-header">
      <div class="header-left">
        <router-link to="/" class="logo-link">
          <img src="@/assets/logo.png" alt="즈믄누리 로고" class="logo" />
        </router-link>
        <nav class="navigation">
          <router-link to="/games" class="nav-item">게임</router-link>
          <router-link to="/videos" class="nav-item">영상</router-link>
          <router-link to="/store" class="nav-item">상점</router-link>
          <router-link to="/data-request" class="nav-item">데이터 요청</router-link>
        </nav>
      </div>
      <div class="user-menu">
        <button class="search-button" @click="showSearch = !showSearch">
          <img src="@/assets/search-icon.png" alt="검색" />
        </button>
        <router-link to="/login" class="login-button">로그인</router-link>
        <!-- 검색 드롭다운은 user-menu 내부에 위치시킵니다 -->
        <div v-if="showSearch" class="search-dropdown">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="검색어 입력"
            @keyup.enter="onSearch"
          />
          <button @click="onSearch">
            <img src="@/assets/search-icon.png" alt="검색" />
          </button>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showSearch  = ref(false)
const searchQuery = ref('')
const router      = useRouter()

function onSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push({ path: '/games', query: { q } })
  showSearch.value = false
}
</script>

<style scoped>
.header-wrapper {
  position: relative; /* 드롭다운이 이 기준에 따라 배치됩니다 */
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
  height: 85px;
  padding: 0 28px 0 10px;
  border-bottom: 1px solid #2E2E2E;
  box-sizing: border-box;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 35px;
}
.logo {
  width: 250px;
}
.navigation {
  display: flex;
  gap: 25px;
  margin-top: 27.5px;
}
.nav-item {
  text-decoration: none;
  color: #2E2E2E;
  font-size: 20px;
  font-weight: 600;
}

.user-menu {
  position: relative;  /* 이 안에서 search-dropdown이 떠야 합니다 */
  display: flex;
  align-items: center;
  gap: 20px;
}
.login-button {
  width: 93px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #2E2E2E;
  border-radius: 19px;
  background-color: transparent;
  font-size: 19px;
  font-weight: 600;
  color: #2E2E2E;
  text-decoration: none;
  cursor: pointer;
  color: #2E2E2E;
  text-align: center;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.search-button {
  border: none;
  background: none;
  cursor: pointer;
}
.search-button img {
  width: 22px;
  height: 22px;
}

/* ▼ 검색 드롭다운 ▼ */
.search-dropdown {
  position: absolute;
  top: 100%;    /* user-menu 바로 아래 */
  right: 0;     /* user-menu의 우측 끝에 정렬 */
  margin-top: 8px;
  display: flex;
  align-items: center;
  background: #FFF;
  border: 1px solid #CCC;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-radius: 4px;
  padding: 8px;
  gap: 8px;
  z-index: 10;  /* 헤더 위에 떠 있도록 */
}
.search-dropdown input {
  border: 1px solid #CCC;
  padding: 6px 8px;
  border-radius: 4px;
  width: 180px;
}
.search-dropdown button {
  background: none;
  border: none;
  cursor: pointer;
}
.search-dropdown button img {
  width: 18px;
  height: 18px;
}
</style>
