import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// BAŞINDAKİ "export" KELİMESİ HAYATİ ÖNEM TAŞIYOR!
export const sendContactMessage = async (formData) => {
  try {
    await addDoc(collection(db, "messages"), {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Mesaj gönderilirken hata oluştu:", error);
    return { success: false, error: error.message };
  }
};