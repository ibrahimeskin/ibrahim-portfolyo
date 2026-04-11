import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom'; // Bu satırı ekle

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Bunu tanımla

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Alert yerine yönlendirme yapıyoruz
      navigate('/admin/dashboard'); 
    } catch (err) {
      setError("Hatalı e-posta veya şifre girdin!");
    }
  };

  // ... return kısmı aynı kalabilir ...
  return (
    // Mevcut return kodlarını buraya yapıştır
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {/* Önceki mesajda verdiğim form kodlarının aynısı */}
      <div className="max-w-md w-full bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-slate-100 dark:border-dark-700 p-8">
        <h2 className="text-2xl font-display font-bold text-center text-slate-900 dark:text-white mb-6">Admin Girişi</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="E-posta" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Şifre" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
}