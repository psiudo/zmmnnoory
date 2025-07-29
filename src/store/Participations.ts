import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/services/axios'
import type { ParticipatedPayload, StartPayload } from '@/services/info' 

export const useParticipationStore = defineStore('participation', () => {
  const API_URL = "https://ec2-3-38-95-2.ap-northeast-2.compute.amazonaws.com"

  // 내가 참여한 게임 조회
  const participated_game = ref<ParticipatedPayload[] | null>(null)
  const getParticipatedGame = async (): Promise<void> => {
    try {
      const res = await axios.get(`${API_URL}/api/participations/member/me`)
      console.log('참여 내역 조희 get', res)
      participated_game.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // 게임 참여 시작
  const gameStart = async (payload: StartPayload): Promise<void> => {
    try {
      const res = await axios.post(`${API_URL}/participations/start`, payload)
      console.log('게임 시작 post', res)
    } catch (err) {
      console.log(err)
    }
  }

  // 게임 종료 및 리워드 지급
  const gameEnd = async (payload: StartPayload): Promise<void> => {
    try {
      const res = await axios.put(`${API_URL}/api/participations/end`, payload)
      console.log('리워드 지급 put', res)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    participated_game,
    getParticipatedGame,
    gameStart,
    gameEnd,
  }
})