import { motion } from 'framer-motion'
import {
  Instagram, Twitter, Github, Linkedin, Mail, Send
} from 'lucide-react'
import { SOCIAL_LINKS } from '../services/socialLinks'

const ICON_MAP = { Instagram, Twitter, Github, Linkedin, Mail, Send }

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-dark-600 bg-white dark:bg-dark-900 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col items-center gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-900 dark:text-white">
          <img 
            src="/favicon.png" 
            alt="Logo" 
            className="w-8 h-8 object-contain dark:hidden" 
          />
          <img 
            src="/beyaz.png" 
            alt="Logo" 
            className="w-8 h-8 object-contain hidden dark:block" 
          />
          <span className="tracking-tight">
            ibrahimeskin<span className="text-blue-500">.com</span>
          </span>
        </div>

        {/* Sosyal Medya İkonları */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {SOCIAL_LINKS
            .filter(link => link.id !== 'instagram-trade') 
            .map((link) => {
              const Icon = ICON_MAP[link.icon] || Mail
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center
                    bg-slate-100 dark:bg-dark-700
                    text-slate-500 dark:text-slate-400
                    hover:bg-slate-200 dark:hover:bg-dark-600
                    transition-colors duration-200 ${link.color}`}
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
        </div>

        {/* Telif Hakkı */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
            © {year} İbrahim Eskin — Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}