<template>
  <canvas
    ref="canvasRef"
    :width="350"
    :height="300"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="stopDrag"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag" />
  <video
    ref="videoRef"
    style="display: none"
    autoplay
    playsinline />
  <button @click="captureRect">Capture Rectangle</button>
  <img
    v-if="capturedImg"
    :src="capturedImg"
    alt="Captured"
    style="margin-top: 10px; max-width: 200px" />
</template>

<script setup lang="ts">
import Tesseract from 'tesseract.js';

const { stream, start } = useUserMedia();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const videoRef = ref<HTMLVideoElement | null>(null);
const capturedImg = ref<string | null>(null);

// Rectangle coordinates and size
const rect = ref({ x: 20, y: 20, width: 200, height: 200, lineWidth: 5 });

// Drag state
let isDragging = false;
let isResizing = false;
let offsetX = 0;
let offsetY = 0;

function drawRect() {
  if (!ctx.value) return;

  ctx.value.beginPath();
  ctx.value.rect(
    rect.value.x,
    rect.value.y,
    rect.value.width,
    rect.value.height
  );
  ctx.value.lineWidth = rect.value.lineWidth;
  ctx.value.strokeStyle = 'red';
  ctx.value.stroke();
  ctx.value.fillStyle = 'steelblue';
  ctx.value.fillRect(
    rect.value.x + rect.value.width - 20,
    rect.value.y + rect.value.height - 20,
    20,
    20
  );
}

function startDrag(event: MouseEvent | TouchEvent) {
  const { mouseX, mouseY } = getMouseMove(event);

  // Mouse inside the rect but not in resizing
  if (
    mouseX >= rect.value.x &&
    mouseX <= rect.value.x + rect.value.width - 20 &&
    mouseY >= rect.value.y &&
    mouseY <= rect.value.y + rect.value.height - 20
  ) {
    isDragging = true;
    // pour conserver l'endroit exacte du click et que le mouvement du rect suive la souris
    // ex: clic à 150px et rect.x à 20 => offset est donc a 130px
    offsetX = mouseX - rect.value.x;
    offsetY = mouseY - rect.value.y;
  }

  // click inside resizing rect
  if (
    mouseX >= rect.value.x + rect.value.width - 20 &&
    mouseX <= rect.value.x + rect.value.width &&
    mouseY >= rect.value.y + rect.value.height - 20 &&
    mouseY <= rect.value.y + rect.value.height
  ) {
    isResizing = true;
    // pour conserver l'endroit exacte du click et que le resize du rect suive la souris
    offsetX = mouseX - rect.value.width;
    offsetY = mouseY - rect.value.height;
  }
}

function onDrag(event: MouseEvent | TouchEvent) {
  if (!isDragging && !isResizing) return;
  // le mouvement x de la souris
  const { mouseX, mouseY } = getMouseMove(event);

  // les coordonnées souhaitées, le point de départ de la souris - son deplacement
  // ex avec drag: mouse move at 200px (soit 50px vers la droite) => 200 - 130 = 70px
  // donc je veux que le carré soit à 70px du bord (50px de déplacement + 20px dejà de la bordure)
  const desiredX = mouseX - offsetX;
  const desiredY = mouseY - offsetY;

  if (isDragging) {
    // limite les possibilités de x et y
    rect.value.x = Math.min(
      Math.max(0, desiredX), // la valeur minimal sera 0
      canvasRef.value!.width - rect.value.width // la valeur max sera canvas - rect widht
    );

    rect.value.y = Math.min(
      Math.max(0, desiredY),
      canvasRef.value!.height - rect.value.height
    );
  }
  if (isResizing) {
    rect.value.width = Math.min(
      Math.max(100, desiredX), // la valeur minimal sera 0
      canvasRef.value!.width - rect.value.x // la valeur max sera canvas - rect width
    );
    rect.value.height = Math.min(
      Math.max(100, desiredY),
      canvasRef.value!.height - rect.value.y
    );
  }

  drawRect();
}

function stopDrag() {
  isDragging = false;
  isResizing = false;
}

function drawVideoToCanvas() {
  const canvas = canvasRef.value;
  const video = videoRef.value;
  if (canvas && video) {
    ctx.value = canvas.getContext('2d')!;
    ctx.value.clearRect(0, 0, canvas.width, canvas.height);
    ctx.value.drawImage(video, 0, 0, canvas.width, canvas.height);

    drawRect();
  }
  requestAnimationFrame(drawVideoToCanvas);
}

// Capture only the rectangle area from the video
async function captureRect() {
  const video = videoRef.value;
  if (!video) return;

  // Create a temporary canvas for the cropped image
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = rect.value.width;
  tempCanvas.height = rect.value.height;
  const tempCtx = tempCanvas.getContext('2d')!;

  // Draw only the rectangle area from the video
  tempCtx.drawImage(
    video,
    (rect.value.x / canvasRef.value!.width) * video.videoWidth, // source x
    (rect.value.y / canvasRef.value!.height) * video.videoHeight, // source y
    (rect.value.width / canvasRef.value!.width) * video.videoWidth, // source width
    (rect.value.height / canvasRef.value!.height) * video.videoHeight, // source height
    0,
    0,
    rect.value.width,
    rect.value.height // destination
  );

  capturedImg.value = tempCanvas.toDataURL('image/png');

  const result = await Tesseract.recognize(capturedImg.value, 'fra', {
    logger: (m) => console.log(m),
  });
  console.log(result.data.text);
}

onMounted(() => {
  drawVideoToCanvas();
  // navigator.mediaDevices
  //   .getUserMedia({ video: true, audio: false })
  //   .then((stream) => {
  //     if (videoRef.value) {
  //       videoRef.value.srcObject = stream;
  //       videoRef.value.play();
  //       drawVideoToCanvas();
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(`An error occurred: ${err}`);
  //   });
  start();
});

watchEffect(() => {
  // preview on a video element
  if (stream.value) {
    videoRef.value!.srcObject = stream.value;
    videoRef.value!.play();
    drawVideoToCanvas();
  }
});
</script>

<style scoped lang="scss">
canvas {
  border: 1px solid #ccc;
  cursor: nw-resize;
}
</style>
