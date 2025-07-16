import { readMultipartFormData } from 'h3';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { extractTextFromImage } from '~/utils/backend/ocr.js';

export default defineEventHandler(async (event) => {
  // get form body
  const form = await readMultipartFormData(event);
  if (!form || !form.length) {
    return { error: 'Aucune image reçue.' };
  }
  // get image
  const imagePart = form.find((f) => f.name === 'image');
  if (!imagePart || !imagePart.data) {
    return { error: 'Aucune image reçue.' };
  }

  // Sauvegarde temporaire de l'image
  const tempPath = path.resolve(
    'uploads',
    `${Date.now()}_${imagePart.filename}`
  );
  await writeFile(tempPath, imagePart.data);

  try {
    const text = await extractTextFromImage(tempPath);
    // await unlink(tempPath); // Supprime le fichier à l’emplacement tempPath
    return { text };
  } catch (err) {
    await unlink(tempPath); // Supprime le fichier à l’emplacement tempPath
    return { error: "Erreur lors de l'extraction du texte.", err };
  }
});
