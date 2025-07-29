import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/services/axios'
import type { Member, SignupPayload, UpdatePayload, LoginPayload, PasswordUpdate } from '@/services/info'

export const useAccountStore = defineStore('account', () => {
  const API_URL = "https://ec2-3-38-95-2.ap-northeast-2.compute.amazonaws.com"

  // 토큰 키
  const TOKEN_KEY = 'accessToken'

  // 로그인
  const login = async (payload: LoginPayload) => {
    try {
      const res = await axios.post(`${API_URL}/api/members/login`, payload)
      const token = res.data.data
      localStorage.setItem(TOKEN_KEY, token)
      console.log('로그인 post')
    } catch (err) {
      console.log(err)
    }
  }

  // 로그아웃
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    console.log('로그아웃')
  }

  // 전체 사용자 목록 조회
  const member_list = ref<Member[] | null>(null)
  const getMemberList = async () : Promise<void> => {
    try {
      const res = await axios.get<Member[]>(`${API_URL}/api/members`)
      console.log('전체 사용자 목록 get')
      member_list.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // 단일 사용자 조회
  const member_detail = ref<Member | null>(null)
  const getMemberDetail = async (memberId: number) : Promise<void> => {
    try {
      const res = await axios.get<Member>(`${API_URL}/api/members/${memberId}`)
      console.log('단일 사용자 get')
      member_detail.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // 사용자 비밀번호 수정
  const passwordChange = async (payload: PasswordUpdate) : Promise<void> => {
    try {
      const res = await axios.patch(`${API_URL}/api/members/password`, payload)
      console.log('비밀번호 수정 patch', res)
    } catch (err) {
      console.log(err)
    }
  }

  // 사용자 권한 수정
  const roleChange = async (targetId: number) : Promise<void> => {
    try {
      const res = await axios.patch(`${API_URL}/api/memebrs/admin/role-change/${targetId}`)
      console.log('사용자 권한 수정 patch', res)
    } catch (err) {
      console.log(err)
    }
  }

  // 회원가입
  const signUp = async (member: SignupPayload) : Promise<void> => {
    try {
      const res = await axios.post(`${API_URL}/api/members/sign-up`, member)
      console.log('회원가입 post', res)
    } catch (err) {
      console.log(err)
    }
  }

  // 회원정보 수정
  const Update = async (email: string, memberUpdateRequest: UpdatePayload) : Promise<void> => {
    try {
      const res = await axios.put(`${API_URL}/api/members/${email}`, memberUpdateRequest)
      console.log('회원정보 수정 put', res)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    login,
    logout,
    member_list,
    getMemberList,
    member_detail,
    getMemberDetail,
    passwordChange,
    roleChange,
    signUp,
    Update
  }
})