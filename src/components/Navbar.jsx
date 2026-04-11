import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ChevronRight } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { to: '/',         label: 'Ana Sayfa' },
  { to: '/hakkimda', label: 'Hakkımda'  },
  { to: '/projeler', label: 'Projeler'  },
  { to: '/iletisim', label: 'İletişim'  },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Sayfa kaydırıldığında arka planı bulanıklaştır ve sınır ekle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobil menü açıkken arkadaki sayfanın kaymasını engelle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-dark-600/60 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* --- Logo (Sadeleşmiş, İsimsiz) --- */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center z-50 shrink-0 transition-transform active:scale-95"
        >
          {/* Aydınlık Mod Logosu */}
          <img 
            src="/favicon.png" 
            alt="Logo" 
            className="w-9 h-9 object-contain dark:hidden" 
          />
          {/* Karanlık Mod Logosu */}
          <img 
            src="/beyaz.png" 
            alt="Logo" 
            className="w-9 h-9 object-contain hidden dark:block" 
          />
          <span className="hidden md:inline ml-2.5 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            ibrahimeskin<span className="text-primary-500">.com</span>
          </span>
        </Link>

        {/* --- Masaüstü Menü --- */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-primary-500 dark:text-primary-400 bg-primary-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-700'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* --- Sağ Taraf (Tema ve Hamburger) --- */}
        <div className="flex items-center gap-2 z-50">
          {/* Tema Değiştirici */}
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Hamburger Butonu (Mobil) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* --- Mobil Menü Tasarımı --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Arka Plan Karartma */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm md:hidden"
            />
            
            {/* Açılır Menü Kartı */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden absolute top-[72px] left-4 right-4 bg-white dark:bg-dark-800 border border-slate-200 dark:border-dark-700 shadow-2xl rounded-3xl p-3 flex flex-col gap-1 origin-top"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-5 py-4 rounded-2xl text-lg font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? 'text-primary-500 bg-primary-500/10'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-dark-700'
                    }`
                  }
                >
                  {label}
                  <ChevronRight size={18} className="opacity-20" />
                </NavLink>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}