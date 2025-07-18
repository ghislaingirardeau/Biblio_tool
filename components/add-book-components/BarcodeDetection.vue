<template>
  <div class="flex my-2">
    <video
      v-if="!codeBarMessage"
      ref="videoElement"
      class="rounded-md h-80 w-full" />
    <p
      v-else
      class="mt-2 font-bold italic">
      {{ codeBarMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core';

interface Barcode {
  code: string;
  format: string;
}

const emit = defineEmits(['detection-isbn']);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BarcodeDetector = window.BarcodeDetector;

const barcodeDetected = ref<Barcode | null>(null);
const codeBarMessage = ref<string | null>();

const videoElement = ref<HTMLVideoElement | null>(null);
const imagePreview = ref<string | null>(null);

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
      },
      audio: false,
    });
    if (videoElement.value) {
      videoElement.value.srcObject = stream;
      videoElement.value.onloadedmetadata = () => {
        videoElement.value?.play();
        setTimeout(() => {
          stopCamera();
        }, 12000);
      };
      console.dir(videoElement.value);
    }
  } catch (error) {
    console.log(error);
  }
}

function stopCamera() {
  (videoElement.value?.srcObject as MediaStream)
    ?.getTracks()
    .forEach((track) => {
      track.stop();
    });

  getBarcodeFromVideoInterval.pause();
}

// Toutes les 3s, on extrait une image de la vidéo
const getBarcodeFromVideoInterval = useIntervalFn(() => {
  if (!('BarcodeDetector' in window) || !window.BarcodeDetector) {
    return;
  }
  extractPictureFromVideo();
}, 3000);

// Fonction pour extraire une image de la vidéo
// Une fois l'image construite, la passer à la détection de code-barres
function extractPictureFromVideo() {
  if (videoElement.value) {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.value.videoWidth;
    canvas.height = videoElement.value.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      imagePreview.value = imageData;
      const imageEl = document.createElement('img');
      imageEl.src = imageData;
      // Attendre que l'image soit complètement chargée
      imageEl.onload = () => {
        detectBarcode(imageEl);
      };
      imageEl.onerror = () => {
        console.error("Impossible de charger l'image");
        codeBarMessage.value = "Erreur de chargement de l'image";
      };
    }
  }
}

// Fonction pour détecter un code-barres dans une image
const detectBarcode = async (imageElement: HTMLImageElement) => {
  try {
    codeBarMessage.value =
      "Détection en cours..., garder l'image stable pendant 3s";
    const barcodeDetector = new BarcodeDetector({
      formats: [
        'qr_code',
        'code_128',
        'ean_13',
        'code_39',
        'code_93',
        'codabar',
        'ean_8',
        'itf',
        'upc_a',
        'upc_e',
      ],
    });
    const barcodes = await barcodeDetector.detect(imageElement);
    if (barcodes.length > 0) {
      barcodeDetected.value = {
        code: barcodes[0].rawValue,
        format: formatBarcodeFormat(barcodes[0].format),
      };
      codeBarMessage.value = 'Code-barre détecté !';

      emit('detection-isbn', barcodeDetected.value.code);

      // si il y a un code bar detecté, on stop la camera et l'interval
      stopCamera();
    } else {
      // sinon on continue la detection tant que le composant est ouvert
      codeBarMessage.value =
        'Aucun code-barres détecté... continuer la détection';
    }
  } catch (error) {
    console.error('Erreur lors de la détection :', error);
    // si il y a erreur on stop la camera et l'interval
    stopCamera();
    codeBarMessage.value = 'Erreur lors de la détection';
  }
};

function formatBarcodeFormat(format: string) {
  let formatedCode: string[] = [];
  if (format.includes('code')) {
    formatedCode = format.split('_');
    return formatedCode.join('').toUpperCase();
  }
  if (format.includes('ean')) {
    formatedCode = format.split('_');
    return formatedCode.join('-').toUpperCase();
  }
  return format.length ? 'CODE128' : format.toUpperCase();
}

onMounted(() => {
  if (!('BarcodeDetector' in window) || !window.BarcodeDetector) {
    codeBarMessage.value =
      'BarcodeDetector ne fonctionne pas sur ce navigateur, merci de saisir manuellement le code barre';
    return;
  }
  startCamera();
});

onBeforeUnmount(() => {
  stopCamera();
});
</script>

<style scoped></style>
