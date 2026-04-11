import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import PageTransition from '../components/PageTransition';
import ScrollReveal from '../components/ScrollReveal';

import {
  GraduationCap, TrendingUp, Dumbbell, Music, BarChart2,
  ExternalLink, BookOpen, Instagram
} from 'lucide-react'

import SectionHeader from '../components/SectionHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import { SOCIAL_LINKS } from '../services/socialLinks'
import bartinLogo from '../assets/bartin-logo.png'
import arge5 from '../assets/arge5.jpeg'
import arge7 from '../assets/arge7.jpeg'
import kutuphane1 from '../assets/kutuphane1.jpeg'
import yeniFoto from '../assets/argetoplu.jpeg'

// Firebase
import { db } from '../services/firebase'
import { doc, getDoc } from 'firebase/firestore'

const INTERESTS = [
  {
    id: 'fitness', label: 'Fitness', icon: Dumbbell, desc: 'Disiplin ve güç',
    color: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', iconColor: 'text-orange-400',
  },
  {
    id: 'boks', label: 'Boks', icon: '🥊', desc: 'Strateji & azim',
    color: 'from-red-500/20 to-rose-500/20', border: 'border-red-500/30', iconColor: 'text-red-400',
  },
  {
    id: 'muzik', label: 'Müzik', icon: Music, desc: 'Yaratıcı ifade',
    color: 'from-purple-500/20 to-violet-500/20', border: 'border-purple-500/30', iconColor: 'text-purple-400',
  },
  {
    id: 'analiz', label: 'Trading', icon: BarChart2, desc: 'Grafik & veri',
    color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', iconColor: 'text-green-400',
  },
]

// Varsayılan metinler (Firebase boşsa bunlar gösterilir)
const DEFAULTS = {
  aboutMe: 'Üniversite hayatım boyunca bölümümün bana kazandırdığı en değerli yetenek, teknik ezberin ötesine geçip analitik düşünme refleksini kazanmak oldu. Algoritmik mantık ve veri mimarileri üzerine inşa ettiğim altyapı, problemlere çok boyutlu ve çözüm odaklı bakmamı sağlıyor.',
  uniContribution: 'Bu sistematik yaklaşımı, fikir aşamasından kodlamasına kadar uçtan uca tasarlayıp hayata geçirdiğim yazılım projelerinin her adımında aktif olarak kullanıyorum.',
  technicalAnalysis: 'Finansal piyasalara olan ilgim, beni profesyonel düzeyde teknik analiz öğrenmeye yöneltti. Kripto para ve forex piyasalarında Pine Script kullanarak TradingView üzerinde çalışan özel indikatör kodları geliştiriyorum.',
  coursesTaken: 'Veri Yapıları ve Algoritmalar, Nesne Yönelimli Programlama, Veritabanı Yönetim Sistemleri, Web Geliştirme, Yapay Zeka, Mobil Programlama, Bilgisayar Ağları, İstatistik, Grafik Tasarım',
}

export default function About() {
  const [siteData, setSiteData] = useState(DEFAULTS) // null = yükleniyor
  const [lightbox, setLightbox] = useState(null)
  const [photoOrientations, setPhotoOrientations] = useState({})

  const photos = [arge5, arge7, kutuphane1, yeniFoto]

  const openLightbox = (i) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const nextPhoto = () => setLightbox((lightbox + 1) % photos.length)
  const prevPhoto = () => setLightbox((lightbox - 1 + photos.length) % photos.length)

  // Firebase'den site ayarlarını çek
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'siteSettings', 'general'))
        if (snap.exists()) {
          setSiteData(snap.data())
        } else {
          setSiteData(DEFAULTS)
        }
      } catch {
        setSiteData(DEFAULTS)
      }
    }
    fetchSettings()
  }, [])

  // Fotoğraf yönü tespiti
  useEffect(() => {
    photos.forEach((photo, index) => {
      const img = new Image()
      img.onload = () => {
        setPhotoOrientations(prev => ({
          ...prev,
          [index]: img.height > img.width ? 'portrait' : 'landscape'
        }))
      }
      img.src = photo
    })
  }, [])

  // Klavye desteği
  useEffect(() => {
    if (lightbox === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightbox])

  const tradeInstagram = SOCIAL_LINKS.find((s) => s.id === 'instagram-trade')

  // Gösterilecek metinler: Firebase varsa oradan, yoksa defaults
  const getText = (key) => siteData?.[key] || DEFAULTS[key] || ''

  // Dersleri virgülle ayırıp badge yap
  const coursesArray = getText('coursesTaken')
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)

  return (
    <PageTransition>
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 about-page">

        <SectionHeader title="Hakkımda" />

        {/* Eğitim */}
        <ScrollReveal className="mb-12">
          <div className="card p-5 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img src={bartinLogo} alt="Bartın Üniversitesi" className="w-24 h-24 object-contain shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-sm font-mono font-semibold text-primary-400 tracking-wider uppercase mb-1">Eğitim</p>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">Bartın Üniversitesi</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Bilgisayar Teknolojisi ve Bilişim Sistemleri
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline">4. Sınıf Öğrencisi</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Hakkımda */}
        {siteData?.aboutMe && (
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="relative card p-8 overflow-hidden border-blue-500/30">
              <div className="blur-dot w-64 h-64 bg-blue-500 -right-20 -top-20 opacity-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
                    Hakkımda
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {getText('aboutMe')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Trading */}
        <ScrollReveal delay={0.15} className="mb-12">
          <div className="relative card p-8 overflow-hidden border-accent-500/30">
            <div className="blur-dot w-64 h-64 bg-accent-500 -right-20 -top-20 opacity-10" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-accent-400" />
                </div>
               
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-3 mb-3">
                Teknik Analiz & Finansal Piyasalar
              </h3>
              {siteData === null ? (
                <LoadingSpinner text="Yükleniyor..." />
              ) : (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {getText('technicalAnalysis')}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                {tradeInstagram && (
                  <a 
  href={tradeInstagram.url} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-sm hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
>
  <Instagram size={15} /> Instagram <ExternalLink size={12} />
</a>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Aldığım Dersler */}
        <ScrollReveal delay={0.1} className="mb-12">
          <div className="card p-8">
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <GraduationCap size={20} className="text-primary-400" />
              Aldığım Dersler
            </h3>
            {siteData === null ? (
              <LoadingSpinner text="Dersler yükleniyor..." />
            ) : (
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              >
                {coursesArray.map((course, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                    }}
                    className="tag text-sm bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/60"
                  >
                    {course}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </ScrollReveal>

        {/* İlgi Alanları */}
        <ScrollReveal delay={0.1}>
          <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-6">İlgi Alanları</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INTERESTS.map((item, i) => {
              const Icon = typeof item.icon === 'string' ? null : item.icon
              return (
                <ScrollReveal key={item.id} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -4 }}
                    className={`relative rounded-2xl border ${item.border} bg-gradient-to-br ${item.color} p-4 flex flex-col items-center justify-center gap-2 cursor-default`}
                  >
                    <div className="text-4xl">
                      {typeof item.icon === 'string' ? item.icon : <Icon size={36} className={item.iconColor} />}
                    </div>
                    <div className="text-center">
                      <p className="font-display font-semibold text-slate-900 dark:text-white text-sm">{item.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Fotoğraflar */}
          <ScrollReveal delay={0.1} className="mt-12">
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-6">Ekran Görüntüleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {photos.map((photo, i) => {
                const orientation = photoOrientations[i] || 'landscape'
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    onClick={() => openLightbox(i)}
                    className={`rounded-3xl overflow-hidden cursor-zoom-in relative group card shadow-xl border border-white/5 bg-slate-100/50 dark:bg-slate-800/50 ${
                      orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/9]'
                    }`}
                  >
                    <img src={photo} alt={`Fotoğraf ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                        Büyüt
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeLightbox}
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  <button onClick={closeLightbox} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <X size={20} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); prevPhoto() }} className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                  <motion.img
                    key={lightbox}
                    initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    src={photos[lightbox]} alt={`Fotoğraf ${lightbox + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
                  />
                  <button onClick={(e) => { e.stopPropagation(); nextPhoto() }} className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums">
                    {lightbox + 1} / {photos.length}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </ScrollReveal>

      </div>
    </PageTransition>
  )
}
