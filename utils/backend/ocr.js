// import Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';

async function extractTextFromImage(imagePath, lang = 'fra') {
  const worker = await createWorker(['eng', 'fra']);
  const {
    data: { text },
  } = await worker.recognize(imagePath);
  await worker.terminate();
  return text;
}

export { extractTextFromImage };
