import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TermsAgreementView from '../views/TermsAgreementView.vue'
import SignupView from '../views/SignupView.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsAgreementView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('@/modules/games/views/GameListView.vue')
    },
    // 👇 [추가] 상세 페이지를 위한 동적 라우트
    {
      path: '/games/:id',
      name: 'GameDetail',
      // GameDetailView.vue 파일을 동적으로 불러옵니다.
      component: () => import('@/modules/games/views/GameDetailView.vue'),
      // URL의 :id 값을 컴포넌트의 props로 전달합니다.
      props: true
    },
    {
      path: '/emoji',
      name : 'EmojiGameView',
      component: () => import('@/views/emoji/EmojiGameView.vue')
    },
    {
      path:'/videos',
      name: 'Videos',
      component: () => import('@/views/VideoListView.vue')
    },
    {
      path: '/store',
      name: 'Store',
      component: () => import('@/views/StoreView.vue')
    }
  ]
})

export default router