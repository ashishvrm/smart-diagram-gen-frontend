import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export const saveGeneratedImage = async (imageData, prompt) => {
  try {
    const imageRef = ref(storage, `images/${Date.now()}.png`);
    await uploadString(imageRef, imageData.split(',')[1], 'base64');
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, 'generatedImages'), {
      imageUrl,
      prompt,
      createdAt: serverTimestamp()
    });

    return imageUrl;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

export const getGeneratedImages = async (limitCount = 10) => {
  try {
    const q = query(collection(db, 'generatedImages'), orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
