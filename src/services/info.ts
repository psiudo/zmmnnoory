import type { String } from "three/examples/jsm/transpiler/AST.js";

export interface Video {
  id: number;
  participationId: number;
  memberNickname: string,
  gameTitle: string,
  title: string;
  description: string;
  isPublic: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  isUploaded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VideoList {
  id: number;
  participationId: number;
  memberNickname: string;
  gameTitle: string;
  title: string;
  description: string;
  isPublic: boolean;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
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

export const dummyVideoList: VideoList[] = [
  {
    id: 1,
    participationId: 101,
    memberNickname: "react_pro",
    gameTitle: "React 챌린지",
    title: "JSX 덕분에 드디어 컴포넌트 이해함ㅋㅋ",
    description: "React의 기초 개념과 JSX 문법 소개",
    isPublic: true,
    videoUrl: "https://example.com/videos/react-intro.mp4",
    thumbnailUrl: "https://picsum.photos/200/200?random=1",
    createdAt: "2025-07-30T09:00:00.000Z"
  },
  {
    id: 2,
    participationId: 102,
    memberNickname: "vue_dev",
    gameTitle: "Vue 3 퀘스트",
    title: "Eminem - Godzilla ft. Juice WRLD (Official Music Video)",
    description: "Composition API를 활용한 실전 예제 만들기",
    isPublic: true,
    videoUrl: "https://example.com/videos/vue3-example.mp4",
    thumbnailUrl: "https://picsum.photos/200/200?random=2",
    createdAt: "2025-07-30T09:20:00.000Z"
  },
  {
    id: 3,
    participationId: 103,
    memberNickname: "ts_master",
    gameTitle: "TS 마스터",
    title: "타입 지옥 탈출기 (feat. any 금지)",
    description: "타입 시스템의 이해와 실습",
    isPublic: false,
    videoUrl: "https://example.com/videos/typescript-basics.mp4",
    thumbnailUrl: "https://picsum.photos/200/200?random=3",
    createdAt: "2025-07-30T09:30:00.000Z"
  },
  {
    id: 4,
    participationId: 104,
    memberNickname: "node_ninja",
    gameTitle: "Node API 챌린지",
    title: "서버 처음 만들어봤는데 진짜 돌아감;;",
    description: "Express를 이용한 REST API 서버 개발",
    isPublic: true,
    videoUrl: "https://example.com/videos/node-api.mp4",
    thumbnailUrl: "https://picsum.photos/200/200?random=4",
    createdAt: "2025-07-30T10:00:00.000Z"
  },
  {
    id: 5,
    participationId: 105,
    memberNickname: "py_coder",
    gameTitle: "파이썬 기초 챌린지",
    title: "파이썬은 진짜 쉬운 줄 알았는데 말이죠...",
    description: "Python 문법과 간단한 실습 예제",
    isPublic: false,
    videoUrl: "https://example.com/videos/python-basic.mp4",
    thumbnailUrl: "https://picsum.photos/200/200?random=5",
    createdAt: "2025-07-30T10:20:00.000Z"
  },
  {
    id: 6,
    participationId: 106,
    memberNickname: "ai_thinker",
    gameTitle: "AI 윤리 탐험",
    title: "AI가 사람보다 착해야 되는 이유",
    description: "AI 시대에서 고려해야 할 윤리적 이슈",
    isPublic: true,
    videoUrl: "https://example.com/videos/ai-ethics.mp4",
    thumbnailUrl: "https://picsum.photos/200/200?random=6",
    createdAt: "2025-07-30T10:30:00.000Z"
  }
];
