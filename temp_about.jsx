import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap, TrendingUp, Dumbbell, Music, BarChart2,
  ExternalLink, BookOpen, Instagram, X, ChevronLeft, ChevronRight
} from 'lucide-react'

// Swiper React bileÅŸenlerini ve stillerini import ediyoruz
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import { getCourses, getCategoryColor } from '../services/courseService'
import { SOCIAL_LINKS } from '../services/socialLinks'
import bartinLogo from '../assets/bartin-logo.png'
import arge5 from '../assets/arge5.jpeg'
import arge7 from '../assets/arge7.jpeg'
import kutuphane1 from '../assets/kutuphane1.jpeg'
import yeniFoto from '../assets/argetoplu.jpeg' // Yeni fotoÄŸraf import edildi

const INTERESTS = [
  {
    id: 'fitness',
    label: 'Fitness',
    icon: Dumbbell,
    desc: 'Disiplin ve gÃ¼Ã§',
    color: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-500/30',
    iconColor: 'text-orange-400',
  },
  {
    id: 'boks',
    label: 'Boks',
    icon: 'ğŸ¥Š',
    desc: 'Strateji & azim',
    color: 'from-red-500/20 to-rose-500/20',
    border: 'border-red-500/30',
    iconColor: 'text-red-400',
  },
  {
    id: 'muzik',
    label: 'MÃ¼zik',
    icon: Music,
    desc: 'YaratÄ±cÄ± ifade',
    color: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
  },
  {
    id: 'analiz',
    label: 'Trading',
    icon: BarChart2,
    desc: 'Grafik & veri',
    color: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-500/30',
    iconColor: 'text-green-400',
  },
]

export default function About() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  // Yeni fotoÄŸraf listeye eklendi
  const photos = [arge5, arge7, kutuphane1, yeniFoto]

  const openLightbox = (i) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prevPhoto = () => setLightbox((prev) => (prev - 1 + photos.length) % photos.length)
  const nextPhoto = () => setLightbox((prev) => (prev + 1) % photos.length)

  const tradeInstagram = SOCIAL_LINKS.find((s) => s.id === 'instagram-trade')

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .finally(() => setLoading(false))
  }, [])

  // Klavye desteÄŸi (ESC, sol/saÄŸ ok)
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

  return (
    <PageTransition>
      {/* Swiper stillerini Ã¶zelleÅŸtirmek iÃ§in global bir class ekliyoruz */}
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 about-page">

        <SectionHeader
          eyebrow="HakkÄ±mda"
          title="Beni TanÄ±yalÄ±m"
        />

        <ScrollReveal className="mb-12">
          <div className="card p-8 flex flex-col sm:flex-row items-center gap-6">
            <img
              src={bartinLogo}
              alt="BartÄ±n Ãœniversitesi"
              className="w-24 h-24 object-contain shrink-0"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm font-mono font-semibold text-primary-400 tracking-wider uppercase mb-1">EÄŸitim</p>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
                BartÄ±n Ãœniversitesi
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Bilgisayar Teknolojisi ve BiliÅŸim Sistemleri
                <span className="hidden sm:inline"> Â· </span>
                <span className="block sm:inline">4. SÄ±nÄ±f Ã–ÄŸrencisi</span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-12">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={20} className="text-primary-400" />
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">
                BÃ¶lÃ¼mÃ¼n Bana KattÄ±klarÄ±
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ãœniversite hayatÄ±m boyunca bÃ¶lÃ¼mÃ¼mÃ¼n bana kazandÄ±rdÄ±ÄŸÄ± en deÄŸerli yetenek, teknik ezberin Ã¶tesine geÃ§ip analitik dÃ¼ÅŸÃ¼nme refleksini kazanmak oldu. Algoritmik mantÄ±k ve veri mimarileri Ã¼zerine inÅŸa ettiÄŸim altyapÄ±, problemlere Ã§ok boyutlu ve Ã§Ã¶zÃ¼m odaklÄ± bakmamÄ± saÄŸlÄ±yor. Bu sistematik yaklaÅŸÄ±mÄ±, fikir aÅŸamasÄ±ndan kodlamasÄ±na kadar uÃ§tan uca tasarlayÄ±p hayata geÃ§irdiÄŸim yazÄ±lÄ±m projelerinin her adÄ±mÄ±nda aktif olarak kullanÄ±yorum
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mb-12">
          <div className="relative card p-8 overflow-hidden border-accent-500/30">
            <div className="blur-dot w-64 h-64 bg-accent-500 -right-20 -top-20 opacity-10" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <TrendingUp size={20} className="text-accent-400" />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase text-accent-400 px-2 py-0.5 rounded-full border border-accent-500/30 bg-accent-500/5">
                  Finans & Trade
                </span>
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-3 mb-3">
                Teknik Analiz & Finansal Piyasalar
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Finansal piyasalara olan ilgim, beni profesyonel dÃ¼zeyde teknik analiz Ã¶ÄŸrenmeye yÃ¶neltti.
                Kripto para ve forex piyasalarÄ±nda{' '}
                <strong className="text-slate-800 dark:text-white">Pine Script</strong> kullanarak
                TradingView Ã¼zerinde Ã§alÄ±ÅŸan Ã¶zel indikatÃ¶r kodlarÄ± geliÅŸtiriyorum.
                RSI diverjansÄ±, Fibonacci seviyeleri, hacim profili ve momentum tabanlÄ± sistemler Ã¼zerine
                kendi stratejilerimi oluÅŸturuyorum. Analitik dÃ¼ÅŸÃ¼nce yapÄ±mÄ± hem yazÄ±lÄ±mda hem de
                piyasa analizinde etkin ÅŸekilde kullanÄ±yorum.
              </p>
              <div className="flex items-center gap-3">
                {tradeInstagram && (
                  <a href={tradeInstagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all duration-200">
                    <Instagram size={15} />
                    Instagram
                    <ExternalLink size={12} />
                  </a>
                )}
                <a href="https://t.me/trade_man_akademi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all duration-200">
                  <ExternalLink size={15} />
                  Telegram Group
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-12">
          <div className="card p-8">
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <GraduationCap size={20} className="text-primary-400" />
              AldÄ±ÄŸÄ±m Dersler
            </h3>
            {loading ? (
              <LoadingSpinner text="Dersler yÃ¼kleniyor..." />
            ) : (
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              >
                {courses.map((course) => (
                  <motion.span
                    key={course.id}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                    }}
                    className={`tag text-sm ${getCategoryColor(course.category)}`}
                  >
                    {course.name}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <span className="text-xl">âœ¨</span>
            Ä°lgi AlanlarÄ±
          </h3>
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

          {/* â”€â”€ FotoÄŸraflar (KaydÄ±rÄ±labilir Kart YapÄ±sÄ±) â”€â”€ */}
          <ScrollReveal delay={0.1} className="mt-12 group/swiper">
            <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-xl">ğŸ“¸</span>
              Ekran GÃ¶rÃ¼ntÃ¼leri
            </h3>

            {/* Swiper BileÅŸeni */}
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20} // Kartlar arasÄ± boÅŸluk
              slidesPerView={1.2} // Mobilde varsayÄ±lan: 1 tam, 0.2 sonraki kart
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                // Tablet ve Ã¼stÃ¼ (sm)
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 24,
                },
                // BÃ¼yÃ¼k ekran (lg)
                1024: {
                  slidesPerView: 3.2,
                  spaceBetween: 30,
                },
              }}
              className="pb-12 !overflow-visible" // Pagination noktalarÄ± iÃ§in alt boÅŸluk ve taÅŸma izni
            >
              {photos.map((photo, i) => (
                <SwiperSlide key={i} className="h-full">
                  {/* FotoÄŸraf KartÄ± */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => openLightbox(i)}
                    className="rounded-3xl overflow-hidden cursor-zoom-in relative group card shadow-xl border border-white/5 bg-slate-100/50 dark:bg-slate-800/50 aspect-[4/5]"
                  >
                    <img
                      src={photo}
                      alt={`FotoÄŸraf ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                        BÃ¼yÃ¼t
                      </span>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}

              {/* Ã–zel Navigasyon ButonlarÄ± (Sadece bÃ¼yÃ¼k ekranlarda hoverda gÃ¶rÃ¼nÃ¼r) */}
              <button className="swiper-button-prev-custom absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300 hover:bg-slate-900 hidden lg:flex">
                <ChevronLeft size={24} />
              </button>
              <button className="swiper-button-next-custom absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center opacity-0 group-hover/swiper:opacity-100 transition-opacity duration-300 hover:bg-slate-900 hidden lg:flex">
                <ChevronRight size={24} />
              </button>
            </Swiper>

            {/* Lightbox (DeÄŸiÅŸmedi, aynÄ± kaldÄ±) */}
            <AnimatePresence>
              {lightbox !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={closeLightbox}
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  {/* Kapat */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>

                  {/* Ã–nceki */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prevPhoto() }}
                    className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* FotoÄŸraf */}
                  <motion.img
                    key={lightbox}
                    initial={{ scale: 0.88, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.88, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                    src={photos[lightbox]}
                    alt={`FotoÄŸraf ${lightbox + 1}`}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
                  />

                  {/* Sonraki */}
                  <button
                    onClick={(e) => { e.stopPropagation(); nextPhoto() }}
                    className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* SayaÃ§ */}
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
