// [FILEPATH] src/constants/form.ts
// 상태 상수
export const STATUS = {
  IDLE: 'idle',
  CHECKING: 'checking',
  AVAILABLE: 'available',
  TAKEN: 'taken'
} as const
export type Status = (typeof STATUS)[keyof typeof STATUS]

// 정규식
export const REGEX = {
  nickname: /^[A-Za-z0-9가-힣]{1,8}$/,
  birth: /^\d{6}$/, // YYMMDD
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/
} as const

// 헬퍼 텍스트
export const HELPERS = {
  nickname: '최대 8글자까지 가능합니다 (특수 문자 제외)',
  birthdate: 'YYMMDD 형식 6자리로 입력해주세요',
  email: '영문, 숫자 조합으로 8자 이상을 작성해주세요',
  password: '영문, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.',
  passwordConfirm: '비밀번호를 한 번 더 입력해주세요'
} as const
