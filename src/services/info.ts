// [FILEPATH] src/services/info.ts
import type { String } from "three/examples/jsm/transpiler/AST.js";

export interface Video {
  id: number;
  participation_id: number;
  title: string;
  desc?: string;
  thumbnail: string;
  url: string;
  is_public: boolean;
}

export interface Game {
  id: number,
  title: string,
  desc: string,
  explain: string,
  difficulty: string,
  point: number,
  thumbnail: string,
  require_data_type: string,
  created_at: string,
  updated_at: string
}

export interface Product {
  id: number,
  title: string,
  category: string,
  price: number,
  thumbnail: string,
  Field1: string,
  Field2: string,
}

export type Gender = 'MALE' | 'FEMALE'
export type Role = 'USER' | 'ADMIN' | 'BUYER'

export interface Member {
  id: number
  email: string
  password: string
  nickname: string
  birthday: String
  gender: Gender
  role: Role
  created_at: string
  updated_at: string
  point: number
  recommender_id?: number
}

// 회원가입용
export interface SignupPayload {
  email: string
  password: string
  nickname: string
  birthday: String
  gender: Gender
  role: Role
}

// 정보수정용
export interface UpdatePayload {
  email: string
  nickname: string
  birthday: String
  gender: Gender
}

// 게임 등록용
export interface GameRegisterPayload {
  title: string,
  desc: string,
  explain: string,
  difficulty: string,
  point: number,
  thumbnail: string,
  require_data_type: string,
}

// 로그인용
export interface LoginPayload {
  email: string,
  password: string,
}

// 비밀번호 수정용
export interface PasswordUpdate  {
    originPassword: string
    updatedPassword: string
}

// 참여한 게임 목록 불러오기 용
export interface ParticipatedPayload {
    gameTitle: string
    status: string
}

// 게임시작용
export interface StartPayload {
  email: string
  gameTitle: string
}