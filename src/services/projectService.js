import { db } from './firebase';
import { collection, getDocs, query, orderBy, limit, where, doc, getDoc } from 'firebase/firestore';

const transformProject = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    description: data.shortDescription || '',
    details: data.details || '',
    techStack: data.technologies || [],
    imageUrl: data.images?.[0] || '',
    images: data.images || [],
    githubUrl: data.github || '',
    liveUrl: data.demo || '',
    category: data.category || 'web',
    featured: data.featured || false,
    showGithub: data.showGithub ?? true,
    showLive: data.showLive ?? true,
    gameFile: data.gameFile || '',
    createdAt: data.createdAt
  };
};

export const getAllProjects = async () => {
  try {
    // Önce order alanına göre sıralı çek
    let snapshot;
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
      snapshot = await getDocs(q);
    } catch {
      // order index yoksa createdAt ile çek, sonra JS'de sırala
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      snapshot = await getDocs(q);
    }
    return snapshot.docs.map(transformProject);
  } catch (error) {
    console.error('Firebase proje okuma hatası:', error);
    return [];
  }
};

export const getFeaturedProjects = async (limitCount = 4) => {
  try {
    // Tüm featured projeleri çek, order'a göre JS'de sırala
    const q = query(collection(db, 'projects'), where('featured', '==', true));
    const snapshot = await getDocs(q);
    const projects = snapshot.docs.map(transformProject);
    // order alanına göre sırala, sonra limitCount kadar al
    projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    return projects.slice(0, limitCount);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProjectById = async (id) => {
  try {
    const docRef = doc(db, 'projects', id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) return transformProject(snapshot);
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};