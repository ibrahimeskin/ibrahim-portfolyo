import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home     from './pages/Home';
import About    from './pages/About';
import Projects from './pages/Projects';
import Contact  from './pages/Contact';
import Intro    from './components/Intro';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/"         element={<Home />}     />
        <Route path="/hakkimda" element={<About />}    />
        <Route path="/projeler" element={<Projects />} />
        <Route path="/iletisim" element={<Contact />}  />
      </Routes>
    </AnimatePresence>
  );
}

// Admin sayfalarında Navbar ve Footer gösterilmez
function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 text-slate-900 dark:text-white transition-colors duration-300">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(true);

  useEffect(() => {
    const lastIntroTime = localStorage.getItem('lastIntroTime');
    const now = new Date().getTime();
    const FIFTEEN_MINUTES = 15 * 60 * 1000;
    if (!lastIntroTime || (now - lastIntroTime) > FIFTEEN_MINUTES) {
      setIntroDone(false);
    } else {
      setIntroDone(true);
    }
  }, []);

  const handleIntroComplete = () => {
    const now = new Date().getTime();
    localStorage.setItem('lastIntroTime', now);
    setIntroDone(true);
  };

  return (
    <ThemeProvider>
      {!introDone && <Intro onAnimationComplete={handleIntroComplete} />}
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
