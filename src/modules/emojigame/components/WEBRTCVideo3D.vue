<!-- [FILEPATH] src/modules/emojigame/components/WEBRTCVideo3D.vue -->
<template>
  <div class="webrtc-container">
    <div class = "UIoverlay">
      <div id = "time-display">{{ formatTime }}</div>
      <div id = "temp"> {{ temp }} </div>
    </div>

    <video ref="videoRef" autoplay muted playsinline></video>
    <canvas ref="threeCanvasRef" class="three-canvas"></canvas>
    

      <!-- 종료 UI 오버레이 -->
    <div v-if="gameOver" class="game-over-overlay">
      <h1>🎉 게임 종료 🎉</h1>
      <p>도착을 축하합니다!</p>
      <button @click="restart">다시 시작</button>
    </div>

          <!-- 종료 UI 오버레이 -->
    <div v-if="failOver" class="game-over-overlay">
      <h1> 실패 ㅠㅠ </h1>
      <p>시간초과 되셨습니다!</p>
      <button @click="restart">다시 시작</button>
    </div>

      <div v-if="capturedImage" class="captured-preview">
        <h3>캡처된 이미지:</h3>
        <img :src="capturedImage" alt="Captured face" />
      </div>
  </div>

    <div v-if="recordedVideoUrl" class="captured-preview">
    <h3>녹화된 영상:</h3>
    <video :src="recordedVideoUrl" controls autoplay loop></video>
   </div>

</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import type * as FACEAPITYPE from 'face-api.js'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  TextureLoader,
  Mesh,
  BoxGeometry,
  CircleGeometry,
  MeshStandardMaterial,
  Vector3,
  Box3,
  Group,
  Camera,
  Texture,
  Clock,
  CylinderGeometry,
  Vector2
} from 'three'

// let THREE: typeof import('three')
let faceapi: typeof import('face-api.js')

type ObjectInfo = {
  object : Mesh
  velocity : Vector3
  size : Vector3
  scale :Vector3
  isActive: boolean
}

type GameData = {
  mapRepeat : number         // 한 클러스터에 2개의 wall이 있기 때문에 테스트는 repeat*2번함
  knockBackDuration : number // 넉백 지속시간 (단위 : 프레임)
  detectTick : number        // detection 연산 검증 틱
}

type EmojiState = {
  emojiObj : Mesh
  emojiobjID : number
  emojistate :number
  emojiStr : string
}

type EmojiImageInfo = {
  image : string
  imageName : string
}

function restart() {
  location.reload()  // 간단하게 새로고침
}

const videoRef = ref<HTMLVideoElement | null>(null)
const capturedImage = ref<string| null> (null)
const capturedImages = ref<EmojiImageInfo[]> ([])
const gameOver = ref(false)
const failOver = ref(false)
let stream: MediaStream | null = null
const threeCanvasRef = ref<HTMLCanvasElement | null>(null)
const formatTime = ref("00:00")
const temp = ref();
const clock =  new Clock();


let renderer: WebGLRenderer
let updateId: number
let scene:Scene;
let camera:Camera
let canvas:HTMLCanvasElement

let obj_agent : Mesh
let obj_land : Mesh
let obj_wall : Mesh
let obj_wall2 : Mesh
let info_wall : ObjectInfo
let info_wall2 : ObjectInfo
let obj_emojiface : Mesh
let obj_emojiface2 : Mesh
let obj_finishland : Mesh
let obj_finishline : Mesh
let group_wall : Group
let group_wall2 :Group
let group_finish : Group
let state_emoji1 : EmojiState
let state_emoji2 : EmojiState


//녹화 기능 테스트
const mergeCanvas = document.createElement('canvas')
mergeCanvas.width = 790
mergeCanvas.height = 560
const mergeCtx = mergeCanvas.getContext('2d')!

let mediaRecorder: MediaRecorder
let recordedChunks: Blob[] = []
const recordedVideoUrl = ref<string | null>(null)


const emojiLabelList :number[] = [
  0,1,2,3,4,5,6
]

const emotionState: Map<number, string> = new Map([
  [0, 'angry'],
  [1, 'disgusted'],
  [2, 'fearful'],
  [3, 'happy'],
  [4, 'neutral'],
  [5, 'sad'],
  [6, 'surprised']
])

const emotionTexState : Map<number, number> = new Map([
  [0, 0],//angry
  [1, 1],//disgusted
  [2, 2], //fearful
  [3, 3], //happy
  [4, 4], //neutral
  [5, 5],//sad
  [6, 6]  //surprise
])

const tex_emojiList : Texture[] = [];
const gameData : GameData = {
  mapRepeat : 3,          
  knockBackDuration : 60, //(단위 : 프레임)
  detectTick : 60         //(단위 : 프레임)
}


let tick: number = 0;
let repeatCount: number = 0;
let current_emotionState = 0;


function setscene(): void{
  scene = new Scene()
  camera = new PerspectiveCamera(60, 790 / 560, 0.1, 1000)
  canvas = threeCanvasRef.value!
  renderer = new WebGLRenderer({ canvas, alpha: true }) // alpha: true → 배경 투명
  renderer.setSize(790, 560)
  renderer.setPixelRatio(window.devicePixelRatio)
}


function awake(): void{
  const tex_emoji = new TextureLoader().load('/textures/tex_emoji.png')
  const tex_wood = new TextureLoader().load('/textures/tex_wood.jpg')
  const tex_road = new TextureLoader().load('/textures/tex_road.png')
  const tex_normal_road = new TextureLoader().load('/textures/tex_normal_road.png')
  const tex_emojiatlas =  new TextureLoader().load('/textures/tex_emoji_atlas.png')
  const tex_finishline = new TextureLoader().load('textures/tex_finishline.jpg')
  const tex_wall = new TextureLoader().load('textures/tex_wall.png')
  const tex_normal_wall = new TextureLoader().load('textures/tex_normal_wall.png')
  
const cols = 7
const rows = 1
const baseWidth = 1 / cols
const baseHeight = 1 / rows
const margin = 0.002  // 좌우 여백 (UV 기준, 약 0.2%씩 안쪽에서 자름)

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const tex = tex_emojiatlas.clone()

    tex.repeat.set(baseWidth - margin * 2, baseHeight)
    tex.offset.set(x * baseWidth + margin, 1 - (y + 1) * baseHeight)

    tex.needsUpdate = true
    tex_emojiList.push(tex)
  }
}

  const geo_land = new BoxGeometry(5.5, 0.1, 40);
  const geo_agent = new CylinderGeometry(1.5, 1.5, 1, 32)
  const geo_wall = new BoxGeometry(5.5, 10, 2);
  const geo_emojiFace = new CircleGeometry(1,32);
  const geo_finishline = new BoxGeometry(10, 0.1, 2);
  const geo_finishland = new BoxGeometry(10, 0.2, 20);

  const mat_wall = new MeshStandardMaterial({ 
    map:tex_wall,
    normalMap:tex_normal_wall,
    roughness : 1.0 
  })
  mat_wall.normalScale = new Vector2(0.5,0.5);
  const mat_agent  =new MeshStandardMaterial({
    map:tex_emoji
  })
  const mat_emoji = new MeshStandardMaterial({
    map:tex_emojiList[0],
    transparent: true,
  })
  const mat_wood = new MeshStandardMaterial({
    map : tex_wood
  })
  const mat_finishline = new MeshStandardMaterial({
    map : tex_finishline
  })

  const mat_road = new MeshStandardMaterial({
    map : tex_road,
    normalMap : tex_normal_road,
  })


  
  obj_agent = new Mesh(geo_agent, mat_agent);
  let poss = obj_agent.position.clone()
  poss.y = 10
  obj_agent.lookAt(poss)
  obj_agent.rotateY(1.55)
  obj_land =  new Mesh(geo_land, mat_road);

  obj_wall = new Mesh(geo_wall, mat_wall);
  obj_wall2 = obj_wall.clone();

  obj_emojiface = new Mesh(geo_emojiFace, mat_emoji);
  obj_emojiface2 = obj_emojiface.clone();
  obj_emojiface2.material = mat_emoji.clone();

  
  obj_finishline = new Mesh(geo_finishline, mat_finishline);
  obj_finishland = new Mesh(geo_finishland, mat_wood);
  
  group_wall = new Group();
  group_wall.add(obj_wall)
  group_wall.add(obj_emojiface)
  
  group_wall2 = new Group();
  group_wall2.add(obj_wall2)
  group_wall2.add(obj_emojiface2)

  group_finish = new Group();
  group_finish.add(obj_finishland);
  group_finish.add(obj_finishline);


  let state = randomizeEmojiTexture(obj_emojiface);
  let state2 = randomizeEmojiTexture(obj_emojiface2);

  info_wall = makeObjectInfo(obj_wall);
  state_emoji1 = {
      emojiObj : obj_emojiface,
      emojiobjID : obj_emojiface.id,
      emojistate : state,
      emojiStr : emotionState.get(state)!
  }

  console.log()


  info_wall2 = makeObjectInfo(obj_wall2);
  state_emoji2 = {
    emojiObj : obj_emojiface2,
    emojiobjID : obj_emojiface2.id,
    emojistate : state2,
    emojiStr : emotionState.get(state2)!
  }

  scene.add(obj_agent)
  scene.add(obj_land)
  scene.add(group_wall)
  scene.add(group_wall2)
  scene.add(group_finish)
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
    console.log('모델 로드 완료?')

      // 2. 웹캠 스트리밍
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
          }
      )
  if (videoRef.value) {
    videoRef.value.srcObject = stream
    videoRef.value.onloadeddata = () => {
      detect()
    }
  }

  //초기화 작업
  setscene();   
  awake();      
  initializePosition();
  initializeLight();
  let frameRate = 50;
  //onMounted 내 추가
  function startRecording() {
    recordedChunks = []

    const videoStream = mergeCanvas.captureStream(frameRate) // FPS 설정
    const audioTracks = stream?.getAudioTracks() || []
    for(const track of audioTracks){
      videoStream.addTrack(track)
    }

    mediaRecorder = new MediaRecorder(videoStream, { mimeType: 'video/webm' })

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' })
      recordedVideoUrl.value = URL.createObjectURL(blob)
    }

    mediaRecorder.start()
  }

  startRecording()

  let knockbackTimer = 0;
  let isKnockback = false;
  let agentSpeed = 0.2
  let agentCameraDistance = 15
  camera.position.x = 4
  

  // 4. 애니메이션 루프
  const update = () => {
    if(elapsed <= 1 && !gameOver.value && !failOver.value){
      cancelAnimationFrame(updateId)
      StopRecording()
      //gameOver.value  = true;
      failOver.value = true;
      return;
    }
1
    cameraMove(agentCameraDistance);
    if(!gameOver.value && !failOver.value){
      updateTime();
    }

    //emotion change
    let flag =getCurrentEmotion();
    if(flag != -1){
      current_emotionState = flag;
      let idx = emotionTexState.get(current_emotionState)!
      console.log("emtion change!!!!!!! " + flag + " " + idx)
      changeTexture(obj_agent, tex_emojiList[idx]);
    }

    const box_agent = new Box3().setFromObject(obj_agent)
    const box_wall = new Box3().setFromObject(obj_wall)
    const box_wall2 = new Box3().setFromObject(obj_wall2)
    const offset = 20

    
    if(!isKnockback && repeatCount % 2== 0) {
      isKnockback = collisionTest(box_agent, box_wall, group_wall, info_wall, obj_emojiface, offset, isKnockback, state_emoji1);
    }
    else if(!isKnockback && repeatCount % 2 == 1) {
      isKnockback = collisionTest(box_agent, box_wall2, group_wall2, info_wall2, obj_emojiface2, offset, isKnockback, state_emoji2);
    }
    

    //knockbackTest
    if(isKnockback && knockbackTimer < gameData.knockBackDuration){
      knockbackTimer++;
      obj_agent.position.z += 0.03
    }
    else if(isKnockback && knockbackTimer >= gameData.knockBackDuration){
      knockbackTimer = 0;
      isKnockback = false;
    }
    else{
      obj_agent.position.z-= agentSpeed
    }

    if(!info_wall.isActive){
      group_finish.position.z = obj_land.position.z - 20
      group_finish.position.y = -4.5
      obj_finishline.position.z = obj_finishland.position.z + 5
      obj_finishline.position.y = obj_finishland.position.y + 0.125

    if(obj_agent.position.z < group_finish.position.z && !gameOver.value){
        console.log("end the game")
        agentSpeed = 0;
        temp.value = "dd";
        // StopRecording();
        gameOver.value = true
        GameOver();
        //return;
      }
    }
    tick ++;
    renderer.render(scene, camera)

    //녹화 테스트
    // 얼굴 영상 + js 캔버스를 mergeCanvas에 합성
    if (videoRef.value) {
      mergeCtx.drawImage(videoRef.value, 0, 0, mergeCanvas.width, mergeCanvas.height)
    }
    mergeCtx.drawImage(renderer.domElement, 0, 0, mergeCanvas.width, mergeCanvas.height)

    updateId = requestAnimationFrame(update)
  }
   // detect()
    update()
  }
)

let expressdelta = 0;
let expressions : FACEAPITYPE.FaceExpressions
let dirtycheck =  false;
let overtick = 0;
let overId = 0;
let overTickFrame = 120
function GameOver(){
  overtick++;
 // console.log(" finish : " + overtick)
  if(overtick > overTickFrame){
    StopRecording();
    cancelAnimationFrame(overId);
    cancelAnimationFrame(updateId)
      console.log(" finish!! : " )
    return;
  }
  overId = requestAnimationFrame(GameOver)
}


const detect = async () => {
  if(expressdelta < gameData.detectTick){
     expressdelta ++
  } 
  else{
    if (!videoRef.value) return
    const result = await faceapi.detectSingleFace(
      videoRef.value,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceExpressions()

    if (result) {
     // console.log('감지됨:', result.expressions)
      expressions = result.expressions
      dirtycheck = true;
    }
    expressdelta = 0
  }
  requestAnimationFrame(detect)
}


onBeforeUnmount(() => {
  // 스트림 정리
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
  cancelAnimationFrame(updateId)
  renderer?.dispose()
})


function StopRecording(){
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop()
  }
}

function initializePosition(){
  obj_agent.position.z = 5
  camera.position.z = obj_agent.position.z 
  obj_land.position.y = -5 
  obj_wall.position.z = 0
  obj_wall2.position.z = -10
  obj_emojiface.position.y = 4
  obj_emojiface.position.z = obj_wall.position.z + 2;
  obj_emojiface2.position.y = 4
  obj_emojiface2.position.z = obj_wall2.position.z + 2;


  group_finish.position.y = 100
  group_finish.position.z  = 100
}

let elapsed = 100
let overTime = 90
function updateTime(){
  elapsed = overTime - clock.getElapsedTime()
  const minutes = Math.floor(elapsed / 60)
  const seconds = Math.floor(elapsed % 60)
  formatTime.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  //temp.value = elapsed
}


function initializeLight(){
  const dlight = new DirectionalLight(0xffffff, 4)
  dlight.position.set(0,10,10)
  scene.add(dlight);
}


function cameraMove(agentSpeed : number){
    //velocity
    camera.position.z = obj_agent.position.z + agentSpeed
    camera.position.y = obj_agent.position.y + 2.5
    const lookposition : Vector3 = obj_agent.position.clone();
    lookposition.x -= 9
    camera.lookAt(lookposition)
}


function getCurrentEmotion(){
    let max = -1;
    let maxidx = -1;
      
    if(dirtycheck){
        const arr:number[] = [expressions.angry, expressions.disgusted, expressions.fearful, expressions.happy, expressions.neutral, expressions.sad, expressions.surprised]
        for(let i=0; i<arr.length; i++){
          if(max<arr[i]){
            max = arr[i];
            maxidx = i;
          }
        }
      console.log(emotionState.get(maxidx) + " " + max + " " + maxidx);
      current_emotionState = maxidx;
      dirtycheck  = false;
    }

    return maxidx;
}


function collisionTest(box_temp_agent:Box3, box_temp_wall:Box3, group_temp_wall:Group, info_temp_wall:ObjectInfo, obj_temp_emojiface : Mesh, offset:number, isKnockback : boolean, state_temp_emoji : EmojiState) : boolean {
   let isCollision =  false;  

   if (!isKnockback && info_temp_wall.isActive == true && box_temp_agent.intersectsBox(box_temp_wall)) {
      console.log("현재 상태1 :" + current_emotionState + ", 정답 상태 : " + state_emoji1.emojistate + ", id : " + state_emoji1.emojiobjID)
      console.log("정답 상태 " + state_emoji1.emojiStr)
    if(state_temp_emoji.emojistate == current_emotionState){
          if(videoRef.value){
            let ImageInfo : EmojiImageInfo = cropImage(state_temp_emoji);
            capturedImage.value = ImageInfo.image
            capturedImages.value.push(ImageInfo)
            console.log("캡처 완료:", capturedImage.value) // ✅ 출력 확인
          }

          if(repeatCount < gameData.mapRepeat*2 - 2){
            offsetWall(group_temp_wall, offset)
            const state = randomizeEmojiTexture(obj_temp_emojiface)
            state_temp_emoji.emojistate = state
            state_temp_emoji.emojiStr = emotionState.get(state)!
          }
          else{
            scene.remove(group_temp_wall)
            info_temp_wall.isActive = false;
          }
          repeatCount++;
      }

      else {
        isCollision = true;
      }
    }
    //console.log("knockback? " + isCollision)
    return isCollision;
}

function cropImage(temp_state_emoji : EmojiState) : EmojiImageInfo{
  let video : HTMLVideoElement = videoRef.value!
  if(video == null){
    console.log("멸망");
  }

  const temp_canvas = document.createElement('canvas')
  console.log( video.videoHeight + " " + video.videoWidth)
  temp_canvas.height = video.videoHeight
  temp_canvas.width = video.videoWidth

  const ctx = temp_canvas.getContext('2d')!
  if(!ctx){
    console.error("2d context가 없다 아이가")
    return {
      image : '',
      imageName : ''
    }
  }
  
  console.log(temp_state_emoji.emojiStr  + " 캡처 완료!!")
  ctx.drawImage(video, 0,0, temp_canvas.width, temp_canvas.height)
  return {
    image :  temp_canvas.toDataURL('image/png'),
    imageName : temp_state_emoji.emojiStr + repeatCount
  }
}


function offsetWall(wall : Group ,offset:number){
    wall.position.z = wall.position.z - 20;
    obj_land.position.z -= offset/2
}

/// 
function randomizeEmojiTexture(obj_temp_emoji:Mesh) : number{
    let idx :number =  Math.floor(Math.random() * emojiLabelList.length)
    changeTexture(obj_temp_emoji, tex_emojiList[idx]);

    let label = emojiLabelList[idx];
    console.log("random emoji! " + obj_temp_emoji.id + " " + "emojiidx : " + idx  + " label :  " + label + " " + emotionState.get(label));
    return label;
}

function changeTexture(obj : Mesh, tex : Texture){
  const material  = obj.material as MeshStandardMaterial
  material.map = tex;
  material.needsUpdate = true;
}


function makeObjectInfo(obj : Mesh) : ObjectInfo{
  const geo_tempwall = obj.geometry as BoxGeometry
  const { width, height, depth }  = geo_tempwall.parameters
  const size_tempwall =  new Vector3(width, height, depth)

  return {
    object : obj,
    velocity : new Vector3(0,0,0),
    size : size_tempwall,
    scale : obj.scale.clone(),
    isActive : true,
  }
}


// async function uploadAllCapturedImage(){
//   for(const base64 of capturedImages.value){

//   }
// }



</script>

<style scoped>
.webrtc-container {
  position: relative;
  width: 790px;
  height: 560px;
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
  width: 640px;
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

</style>
