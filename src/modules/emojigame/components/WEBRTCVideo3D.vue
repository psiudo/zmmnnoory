<template>
  <div class="webrtc-container">
    <div class = "UIoverlay">
      <div id = "time-display">{{ ref_formatTime }}</div>
      <div id = "temp"> {{ temp }} </div>

    </div>

    <video ref="ref_video" autoplay muted playsinline></video>
    <canvas ref="ref_threeCanvas" class="three-canvas"></canvas>
    
    <div v-if="!ref_isFaceDetected" class="game-over-overlay">
    <p>😃 {{ ref_recognizeText }}</p>
    </div>
    <div v-if="ref_countdown !== null" class="countdown-overlay">
      <p style="font-size: 48px; font-weight: bold;">{{ ref_countdown }}</p>
    </div>

      <!-- 종료 UI 오버레이 -->
    <div v-if="ref_gameOver" class="game-over-overlay">
      <h1>🎉 게임 종료 🎉</h1>
      <p>도착을 축하합니다!</p>
      <button @click="restart">다시 시작</button>
    </div>

          <!-- 종료 UI 오버레이 -->
    <div v-if="ref_timeOver" class="game-over-overlay">
      <h1> 실패 ㅠㅠ </h1>
      <p>시간초과 되셨습니다!</p>
      <button @click="restart">다시 시작</button>
    </div>

      <div v-if="ref_capturedImage" class="captured-preview">
        <h3>캡처된 이미지:</h3>
        <img :src="ref_capturedImage" alt="Captured face" />
      </div>
  </div>

    <div v-if="ref_recordedVideoURL" class="captured-preview">
    <h3>녹화된 영상:</h3>
    <video :src="ref_recordedVideoURL" controls autoplay loop></video>
   </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
// import type * as FACEAPITYPE from 'face-api.js'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Box3,
} from 'three'
import type {  GameData, EmojiImageInfo, State_Current } from "../types/types";
import type { FaceExpressions} from 'face-api.js'
import { CameraManager } from '../class/CameraManager'
import { GameUtils } from '../class/GameUtils'
import { PlayerManager } from '../class/PlayerManager'
import { GameManager } from '../class/GameManager'
import { SceneManager } from '../class/SceneManager'
import { EmojiManager} from '../class/EmojiManager'
import { MediaManager } from '../class/MediaManager'

let faceapi: typeof import('face-api.js')

/* ----------------------------------- */
// 🎥 비디오/캔버스
const ref_video = ref<HTMLVideoElement | null>(null)
const ref_threeCanvas = ref<HTMLCanvasElement | null>(null)

// ⏱ 시간/텍스트 관련
const ref_formatTime = ref("00:00")
const temp = ref()
const ref_countdown = ref<number | null>(null)

// 📷 이미지 / 영상 기록
const ref_capturedImage = ref<string | null>(null)
const ref_capturedImages = ref<EmojiImageInfo[]>([])
const ref_recordedVideoURL = ref<string | null>(null)

// 🎮 게임 상태
const ref_gameOver = ref(false)
const ref_timeOver = ref(false)
const ref_isFaceDetected = ref(false)

// 🧠 UX 메시지
const ref_recognizeText = ref("얼굴을 인식 중입니다... 시작을 위해 화면에 얼굴을 보여주세요")

// 🎮 Three.js 기본 구성
let renderer: WebGLRenderer
let canvas: HTMLCanvasElement


// 🎮 게임 상태 변수
let tick: number = 0
let repeatCount: number = 0
let expressdelta = 0
let expressions: FaceExpressions
let dirtycheck = false
let overtick = 0
let overId = 0
let overTickFrame = 120
let overTime = 90
let gameStart = false

// 🧍‍♂️ 에이전트 상태
let updateId = 0
let cameraManager : CameraManager
let playerManager : PlayerManager
let sceneManager :SceneManager;
let emojiManager : EmojiManager;
let gameManager : GameManager;
let mediaManager : MediaManager
/* -----------------------------------*/

function awake(){
  
  const camera = new PerspectiveCamera(60, mediaManager.width / mediaManager.height, 0.1, 1000)
  const scene = new Scene()
  canvas = ref_threeCanvas.value!
  renderer = new WebGLRenderer({ canvas, alpha: true }) // alpha: true → 배경 투명
  renderer.setSize(mediaManager.width, mediaManager.height)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true


  sceneManager = new SceneManager(scene, 2);
  emojiManager = new EmojiManager(sceneManager.list_obj_emojiface);
  cameraManager =  new CameraManager(camera, 15);
  playerManager = new PlayerManager(sceneManager.obj_agent);


  const list_States :State_Current[] = [];
  for(let i=0; i<sceneManager.wallCount; ++i){
      list_States.push({
        current_group : sceneManager.list_obj_group_wall[i] ,
        current_info : sceneManager.list_obj_wallinfo[i],
        current_state_emoji: emojiManager.list_obj_emoji_state[i],
        current_wall:sceneManager.list_obj_wall[i]
      })
  }

  const gameData: GameData = {
    mapRepeat: 3,
    knockBackDuration: 40,
    detectTick: 60,
  }
  gameManager = new GameManager(gameData, sceneManager.obj_land, list_States);


  gameManager.state_current = gameManager._list_States[0];
  cameraManager.initializeCamera(sceneManager.obj_agent);
  playerManager.initializePlayer();
}


onMounted(async () => {
    //0. lazy import
    [faceapi] = await Promise.all([
      import('face-api.js')
    ])
      // 1. 모델 로드
    await Promise.all([
      faceapi.nets.tinyFaceDetector.load('/models/'),
      faceapi.nets.faceExpressionNet.load('/models/')
    ])
    ///console.log('모델 로드 완료?')
    mediaManager = new MediaManager(600,400, ref_video.value!);

    await mediaManager.initializeMedia();
    
    if (ref_video.value) {
    ref_video.value.srcObject = mediaManager.stream
    ref_video.value.onloadeddata = () => {
      detect()
    }
  }

  //초기화 작업
    awake()
  }
)

//정상 종료
async function GameOver(){
  overtick++;
  if(overtick > overTickFrame){
    mediaManager.stopRecording();
    cancelAnimationFrame(overId);
    cancelAnimationFrame(updateId)
    console.log(" finish!! : " )
    return;
  }
  overId = requestAnimationFrame(GameOver)
}




const detect = async () => {
  if(expressdelta < gameManager._gameData.detectTick){
     expressdelta ++
  } 
  else{
    if (!ref_video.value) return
      const result = await faceapi.detectSingleFace(
      ref_video.value,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions()

    if (result) {
     // console.log('감지됨:', result.expressions)
      expressions = result.expressions
      dirtycheck = true;

      if(!ref_isFaceDetected.value && !gameStart){
        ref_isFaceDetected.value = true
        gameStart = true
        console.log('얼굴 감지 됨!')
        startCountdown()
      }
      else if(!ref_isFaceDetected.value){
        ref_isFaceDetected.value = true
      }
    }
    else{
      ref_isFaceDetected.value = false;
      ref_recognizeText.value = "어디 가셨나요??? 빨리 돌아와~~~!!"
    }
    expressdelta = 0
  }
  requestAnimationFrame(detect)
}


function startCountdown(){
  ref_countdown.value = 3
  const interval = setInterval(() => {
    if (ref_countdown.value !== null) {
      ref_countdown.value--

      if (ref_countdown.value === 0) {
        clearInterval(interval)
        ref_countdown.value = null
         mediaManager.startRecording(50, ref_recordedVideoURL)
          update();  // ⏰ 게임 시작
      }
    }
  }, 1000)
}

function restart() {
  location.reload()  // 간단하게 새로고침
}

  // 4. 애니메이션 루프
function update() {
    const current_state : State_Current =  gameManager.state_current;
    GameUtils.timeDirtyChcek = true;
    

    if(GameUtils.remainTime(overTime) <= 1 && !ref_timeOver.value && !ref_timeOver.value){
      cancelAnimationFrame(updateId)
      mediaManager.stopRecording()
      playerManager.stop();
      ref_timeOver.value = true;
      return;
    }

    cameraManager.update();
    if(!ref_gameOver.value && !ref_timeOver.value) updateTime();
    
    //player emoji change
    let flag = emojiManager.getCurrentEmotion(expressions,dirtycheck);
    //console.log("flag " + flag + " " + EmojiManager.map_state_name.get(flag));
    if(flag != -1){
      let idx_atlas = EmojiManager.map_emoji_atlas_state.get(flag)!
      GameUtils.changeTexture(playerManager._obj_player,EmojiManager.list_tex_emoji[idx_atlas]);
      playerManager.state_emoji = flag;
    }

    let isCollision =  playerManager.isCollision(new Box3().setFromObject(current_state.current_wall));
    
    // console.log("현재 상태 : "+ current_state.current_state_emoji.emojistate
    //   + "현재 상태 2 : " + emojiManager.current_emojiState.emojistate
    //   +" 플레리어 상태 : " + playerManager.state_emoji
    // )

    if(isCollision && playerManager.state_emoji == current_state.current_state_emoji.emojistate){
        //성공 후 통과
          //image crop
          if(ref_video.value){
            let ImageInfo : EmojiImageInfo = mediaManager.cropImage(current_state.current_state_emoji, repeatCount);
              showCropImage(ImageInfo);
             // console.log("캡처 완료:", ref_capturedImage.value) // ✅ 출력 확인
          }

          //wall 이동 및 텍스처
          if(repeatCount < gameManager._gameData.mapRepeat*2 - 2){
            const offset = 20;
            GameManager.offsetWall(current_state.current_group, sceneManager.obj_land, offset)
            const state = EmojiManager.randomizeEmojiTexture(current_state.current_state_emoji.emojiObj)
            current_state.current_state_emoji.emojistate = state
            current_state.current_state_emoji.emojiStr = EmojiManager.map_state_name.get(state)!
            repeatCount++;
          }
          //종료조건에 가까워 지는 경우 오브젝트를 삭제시켜서 최적화시키기
          else{
            current_state.current_group.visible = false;
            current_state.current_info.isActive = false;
          }

          gameManager.changeCurrentState();
    }
    else if(isCollision){
        playerManager.isKnockback = true;
    }

    playerManager.update();
    
    if(gameManager.checkgameOver(sceneManager)){
      ref_gameOver.value = gameManager.gameOver;
      playerManager.stop();
      GameOver();
    }

    tick ++;
    renderer.render(sceneManager._scene, cameraManager._camera)

    //녹화 테스트
    // 얼굴 영상 + js 캔버스를 mergeCanvas에 합성
    if (ref_video.value) {
      mediaManager.mergeCtx.drawImage(ref_video.value, 0, 0, mediaManager.mergeCanvas.width, mediaManager.mergeCanvas.height)
    }
    mediaManager.mergeCtx.drawImage(renderer.domElement, 0, 0, mediaManager.mergeCanvas.width, mediaManager.mergeCanvas.height)

    updateId = requestAnimationFrame(update)
  }



onBeforeUnmount(() => {
  // 스트림 정리
  mediaManager.dispose();
  cancelAnimationFrame(updateId)
  renderer?.dispose()
})



function updateTime(){
  var typeTime = GameUtils.updateTime(overTime);
  ref_formatTime.value = `${String(typeTime.minute).padStart(2, '0')}:${String(typeTime.second).padStart(2, '0')}`
}


function showCropImage(info_image: EmojiImageInfo){
      ref_capturedImage.value = info_image.image
      ref_capturedImages.value.push(info_image)
 //     console.log("캡처 완료:", ref_capturedImage.value) // ✅ 출력 확인
}


// async function uploadref_capturedImages() {
//   for (const imageInfo of ref_capturedImages.value) {
//     try {
//       const res = await uploadImage(imageInfo)
//       console.log('이미지 업로드 성공:', res.data)
//     } catch (err) {
//       console.error('이미지 업로드 실패:', err)
//     }
//   }
// }

// async function uploadRecordedVideo() {
//   if (!ref_recordedVideoURL.value) return
//   try {
//     const res = await uploadVideo(ref_recordedVideoURL.value)
//     console.log('영상 업로드 성공:', res.data)
//   } catch (err) {
//     console.error('영상 업로드 실패:', err)
//   }
// }



</script>

<style scoped>
.webrtc-container {
  position: relative;
  width: 600px;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  background-color: black;
}
video, .three-canvas {
  position: absolute;
  top :0;
  left : 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

video {
  z-index: 1;
}

.three-canvas{
  z-index : 2;
  pointer-events: none;
}

.game-over-overlay {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: rgba(0,0,0,0.6);
  color: white;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.captured-preview {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px;
  z-index: 150; /* <video>와 <canvas> 위로 */
  border-radius: 8px;
}

.captured-preview img {
  width: 120px;
  height : auto;
  border: 2px solid #333;
  z-index : 150;
  background-color: aqua;
}

.captured-preview video {
  width: 480px;
  height: auto;
  margin-top: 10px;
  border: 2px solid #333;
}

.UIoverlay {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px 12px;
  border-radius: 8px;
}

.countdown-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5rem;
  color: white;
  z-index: 999;
}

</style>
