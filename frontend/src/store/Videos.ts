import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/services/axios'
import type { Video, VideoUpdatePayload } from '@/services/info'

export const useVideoStore = defineStore('video', () => {
  const API_URL = "http://ec2-3-38-95-2.ap-northeast-2.compute.amazonaws.com"

  // 비디오 상세 조회
  const video_detail = ref<Video | null>(null)
  const getVideoDetail = async (videoId: number): Promise<void> => {
    try {
      const res = await axios.get<Video>(`${API_URL}/api/videos/${videoId}`)
      console.log('비디오 상세 조회 get')
      video_detail.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // 전체 영상 리스트 조회
  const video_list = ref<Video[] | null>(null)
  const getVideoList = async (): Promise<void> => {
    try {
      const res = await axios.get<Video[]>(`${API_URL}/api/videos/public`)
      console.log('전체 영상 목록 get')
      video_list.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // 사용자별 업로드 영상 목록 조회
  const member_videos = ref<Video[] | null>(null)
  const getMemberVideos = async (memberId: number): Promise<void> => {
    try {
      const res = await axios.get<Video[]>(`${API_URL}/api/videos/member/${memberId}`)
      console.log('사용자 업로드 영상 목록 get')
      member_videos.value = res.data
    } catch (err) {
      console.log(err)
    }
  }

  // S3 Pre-signed URL 생성
  const createURL = async (videoId: number, fileName: string): Promise<void> => {
    try {
      const res = await axios.post(`${API_URL}/api/videos/${videoId}/upload-url`, fileName)
      console.log('S3 URL post', res)
    } catch (err) {
      console.log(err)
    }
  }

  // 비디오 정보 업데이트
  const updateVideo = async (videoId: number, payload: VideoUpdatePayload): Promise<void> => {
    try {
      const res = await axios.post(`${API_URL}/api/videos/${videoId}`, payload)
      console.log('비디오 정보 업데이트 post', res)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    video_detail,
    getVideoDetail,
    video_list,
    getVideoList,
    member_videos,
    getMemberVideos,
    createURL,
    updateVideo,
  }
})