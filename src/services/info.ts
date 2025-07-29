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

// 테스트용 더미데이터
export const dummyGames: Game[] = [
  {
    id: 1,
    title: '표정 따라잡기',
    desc: '표정을 인식해 따라하는 게임',
    explain: '화면에 나오는 이모지를 따라 표정을 지어보세요.',
    difficulty: '쉬움',
    point: 100,
    thumbnail: 'https://picsum.photos/289/193?random=1',
    require_data_type: '얼굴 표정',
    created_at: '2025-07-01T12:00:00Z',
    updated_at: '2025-07-01T12:00:00Z',
  },
  {
    id: 2,
    title: '음성 따라하기',
    desc: '주어진 문장을 소리내어 말하는 게임',
    explain: '마이크에 대고 문장을 읽어보세요.',
    difficulty: '보통',
    point: 150,
    thumbnail: 'https://picsum.photos/289/193?random=2',
    require_data_type: '음성',
    created_at: '2025-07-02T12:00:00Z',
    updated_at: '2025-07-02T12:00:00Z',
  },
  {
    id: 3,
    title: '눈 깜빡이기 챌린지',
    desc: '정해진 시간 안에 눈을 깜빡여보세요.',
    explain: '센서가 눈 깜빡임을 감지해요.',
    difficulty: '쉬움',
    point: 80,
    thumbnail: 'https://picsum.photos/289/193?random=3',
    require_data_type: '눈동자 움직임',
    created_at: '2025-07-03T12:00:00Z',
    updated_at: '2025-07-03T12:00:00Z',
  },
  {
    id: 4,
    title: '입모양 따라하기',
    desc: '단어의 입모양을 따라 해보세요.',
    explain: '발음에 맞는 입모양을 지어보세요.',
    difficulty: '어려움',
    point: 200,
    thumbnail: 'https://picsum.photos/289/193?random=4',
    require_data_type: '입모양',
    created_at: '2025-07-04T12:00:00Z',
    updated_at: '2025-07-04T12:00:00Z',
  },
  {
    id: 5,
    title: '고개 돌리기 챌린지',
    desc: '화면 지시에 따라 고개를 돌리세요.',
    explain: '왼쪽, 오른쪽으로 빠르게 고개를 움직이세요.',
    difficulty: '보통',
    point: 130,
    thumbnail: 'https://picsum.photos/289/193?random=5',
    require_data_type: '머리 움직임',
    created_at: '2025-07-05T12:00:00Z',
    updated_at: '2025-07-05T12:00:00Z',
  },
  {
    id: 6,
    title: '감정 표현 게임',
    desc: '지정된 감정을 얼굴로 표현해보세요.',
    explain: '슬픔, 기쁨 등 다양한 감정을 표현해보세요.',
    difficulty: '어려움',
    point: 180,
    thumbnail: 'https://picsum.photos/289/193?random=6',
    require_data_type: '감정 표정',
    created_at: '2025-07-06T12:00:00Z',
    updated_at: '2025-07-06T12:00:00Z',
  },
]