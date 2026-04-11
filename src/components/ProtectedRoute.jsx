import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = henüz kontrol edilmedi

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  // Firebase kontrol edene kadar boş bekle (flash önleme)
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-950">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Giriş yapılmamışsa login sayfasına yönlendir
  if (!user) return <Navigate to="/admin" replace />;

  return children;
}
