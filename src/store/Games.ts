// [FILEPATH] src/store/Games.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/services/axios'
import type { Game, GameRegisterPayload } from '@/services/info'

export const useGameStore = defineStore('game', () => {
  const API_URL = "https://ec2-3-38-95-2.ap-northeast-2.compute.amazonaws.com"
  
  // 게임 삭제
  const deleteGame = async (id: number): Promise<void> => {
    try {
      const res = await axios.delete(`${API_URL}/api/games/${id}`)
      console.log('게임 삭제 delete', res)
    } catch (err) {
      console.log(err)
    }
  }

  // 게임 단건 조회
  const game_detail = ref<Game | null>(null)
  const getGameDetail = async (id: number): Promise<void> => {
    try {
      const res = await axios.get<Game>(`${API_URL}/games/${id}`)
      console.log('게임 디테일 get')
      game_detail.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // 전체 게임 목록 조회
  const game_list = ref<Game[] | null>(null)
  const getGameList = async (): Promise<void> => {
    try {
      const res = await axios.get<Game[]>(`${API_URL}/api/games/`)
      console.log('전체 게임 목록 get')
      game_list.value = res.data
    } catch (err) {
      console.error(err)
    }
  } 

  // 게임 난이도 검색
  type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD'
  const game_difficulty = ref<Game[] | null>(null)
  const getGameDifficulty = async (difficulty: Difficulty): Promise<void> => {
    try {
      const res = await axios.get<Game[]>(`${API_URL}/api/games/search`, {
        params: {difficulty}
      })
      console.log('난이도별 게임 목록 get')
      game_difficulty.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // 게임 등록
  const gameRegister = async (payload: GameRegisterPayload): Promise<void> => {
    try {
      const res = await axios.post(`${API_URL}/api/games`, payload)
      console.log('게임 등록 post', res)
    } catch (err) {
      console.log(err)
    }
  }

  // 게임 수정
  const gameUpdate = async (id: number, payload: GameRegisterPayload): Promise<void> => {
    try {
      const res = await axios.put(`${API_URL}/api/games/${id}`, payload)
      console.log('게임 수정 put', res)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    deleteGame,
    game_detail,
    getGameDetail,
    game_list,
    getGameList,
    game_difficulty,
    getGameDifficulty,
    gameRegister,
    gameUpdate
  }
})