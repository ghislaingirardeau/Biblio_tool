<template>
  <canvas
    ref="canvasRef"
    :width="500"
    :height="300"
    style="border: 1px solid #ccc; touch-action: none"
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

function startDrag(event: MouseEvent) {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  if (
    mouseX >= rect.value.x &&
    mouseX <= rect.value.x + rect.value.width - 20 &&
    mouseY >= rect.value.y &&
    mouseY <= rect.value.y + rect.value.height - 20
  ) {
    isDragging = true;
    offsetX = mouseX - rect.value.x;
    offsetY = mouseY - rect.value.y;
  }
  if (
    mouseX >= rect.value.x + rect.value.width - 20 &&
    mouseX <= rect.value.x + rect.value.width &&
    mouseY >= rect.value.y + rect.value.height - 20 &&
    mouseY <= rect.value.y + rect.value.height
  ) {
    isResizing = true;
    offsetX = mouseX - rect.value.width;
    offsetY = mouseY - rect.value.height;
  }
}

function onDrag(event: MouseEvent) {
  if (!isDragging && !isResizing) return;
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  // les coordonnées souhaitées, le point de départ de la souris - son deplacement
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
function captureRect() {
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
}

onMounted(() => {
  drawVideoToCanvas();
  // navigator.mediaDevices
  //   .getUserMedia({ video: true, audio: false })
  //   .then((stream) => {
  //     if (videoRef.value) {
  //       videoRef.value.srcObject = stream
  //       videoRef.value.play()
  //       drawVideoToCanvas()
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(`An error occurred: ${err}`)
  //   })
});
</script>

<style scoped></style>
