<template>
  <div class="webrtc-container">
    <video ref="videoRef" autoplay playsinline></video>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, reactive } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
let stream: MediaStream | null = null

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationFrameId: number

const gameState = reactive({
  x: 320,
  y: 240,
  radius: 50,
  tick: 0,
})


onMounted(async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: false,
    })
    if (videoRef.value) {
      videoRef.value.srcObject = stream
    }
    drawLoop();
  } catch (err) {
    console.error('웹캠 접근 실패:', err)
  }
})

function drawLoop() {
  const canvas = canvasRef.value
  
  // ? 는 null가능성이 있음을 말하는 거지만, !는 절대 null일리가 없다고 선언해주는 것.
  const ctx = canvas?.getContext('2d')!

  if (!canvas || !ctx) return

  const width = canvas.width = 640
  const height = canvas.height = 480

  function render() {
    update();
    // 배경 투명 처리
    ctx.clearRect(0, 0, width, height)

    // 원 그리기
    ctx.beginPath()
    ctx.arc(gameState.x, gameState.y, gameState.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 100, 100, 0.7)'
    ctx.fill()

    animationFrameId = requestAnimationFrame(render)
  }

  render()
}



function update() {
  gameState.tick++
  gameState.x += Math.sin(gameState.tick / 10) * 5
}



onBeforeUnmount(() => {
  // 스트림 정리
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
  cancelAnimationFrame(animationFrameId)
})

</script>


<style scoped>
.webrtc-container {
  position: relative;
  width: 640px;
  height: 480px;
  border-radius: 8px;
  overflow: hidden;
  background-color: black;
}
video, canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
}
</style>
