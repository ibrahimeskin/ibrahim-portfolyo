import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink, Github, TrendingUp, Globe,
  Info, X, ArrowUpRight, ChevronLeft, ChevronRight, Gamepad2, ZoomIn, Maximize2, Minimize2
} from 'lucide-react'
import TagBadge from './TagBadge'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.2 } },
}

/* ── OYUN IFRAME MODALI ── */
export function GameModal({ project, onClose }) {
  const [fullscreen, setFullscreen] = useState(false)
  const { title, gameFile, liveUrl } = project

  const gameSrc = gameFile || liveUrl

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        className={`relative bg-dark-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'
        }`}
        style={fullscreen ? {} : { height: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-dark-800 border-b border-dark-700 flex-shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
            <Gamepad2 size={16} className="text-purple-400 flex-shrink-0" />
            <span className="font-bold text-white text-sm truncate">{title}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 flex-shrink-0">🎮 Oyun</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setFullscreen(f => !f)}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-dark-700 hover:bg-dark-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              title={fullscreen ? 'Küçült' : 'Tam Ekran'}
            >
              {fullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-dark-700 hover:bg-red-500/80 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="flex-1 relative bg-black">
          {gameSrc ? (
            <iframe
              src={gameSrc}
              title={title}
              className="w-full h-full border-0"
              allow="fullscreen"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <div className="text-center space-y-2">
                <Gamepad2 size={48} className="mx-auto text-purple-400 opacity-50" />
                <p>Oyun dosyası bulunamadı.</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── GELİŞMİŞ RESİM GALERİSİ ── */
function ImageGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const trackRef = useRef(null)

  if (!images?.length) return null

  const currentImage = images[selectedIndex]

  const scrollToIndex = (index) => {
    const track = trackRef.current
    if (!track) return
    const thumbnails = track.querySelectorAll('button')
    if (thumbnails[index]) thumbnails[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const goToPrevious = () => { const i = (selectedIndex - 1 + images.length) % images.length; setSelectedIndex(i); scrollToIndex(i) }
  const goToNext    = () => { const i = (selectedIndex + 1) % images.length; setSelectedIndex(i); scrollToIndex(i) }

  return (
    <div className="space-y-3">
      <div className="relative group">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
          className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-dark-700"
          style={{ aspectRatio: '16/9' }}
        >
          <img src={currentImage} alt={`Görsel ${selectedIndex + 1}`} className="w-full h-full object-cover cursor-zoom-in" onClick={() => setIsZoomed(true)} />
          <button onClick={() => setIsZoomed(true)} className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70">
            <ZoomIn size={18} />
          </button>
        </motion.div>
        {images.length > 1 && (
          <>
            <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-dark-800/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"><ChevronLeft size={18} /></button>
            <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 dark:bg-dark-800/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white"><ChevronRight size={18} /></button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div ref={trackRef} className="flex gap-2 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
          {images.map((src, idx) => (
            <button key={idx} onClick={() => { setSelectedIndex(idx); scrollToIndex(idx) }}
              className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${selectedIndex === idx ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-dark-800 scale-105' : 'opacity-60 hover:opacity-100'}`}
              style={{ width: '64px', height: '64px' }}
            >
              <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {images.length > 1 && <div className="text-center"><span className="text-xs text-slate-400">{selectedIndex + 1} / {images.length}</span></div>}
      <AnimatePresence>
        {isZoomed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}
            >
              <img src={currentImage} alt="Zoomed" className="w-full h-full object-contain rounded-xl" />
              <button onClick={() => setIsZoomed(false)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"><X size={20} /></button>
              {images.length > 1 && (
                <>
                  <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"><ChevronLeft size={24} /></button>
                  <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"><ChevronRight size={24} /></button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Proje Detay Modali ── */
export function ProjectModal({ project, onClose }) {
  const [gameOpen, setGameOpen] = useState(false)
  const { title, description, details, images, techStack, liveUrl, githubUrl, category, showGithub, showLive, gameFile } = project
  const isTrade = category === 'trade'
  const isGame  = category === 'game'
  const hasGame = isGame && (gameFile || liveUrl)

  return (
    <>
      <motion.div
        variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          className="relative w-full max-w-2xl bg-white dark:bg-dark-800 rounded-2xl shadow-2xl mx-2 sm:mx-0"
          style={{ maxHeight: '90vh', overflowY: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm border-b z-10">
            <div className="flex items-center gap-2 flex-1 min-w-0 pr-4">
              {isTrade && <TrendingUp size={15} className="text-accent-400 flex-shrink-0" />}
              {isGame  && <Gamepad2   size={15} className="text-purple-400 flex-shrink-0" />}
              {!isTrade && !isGame && <Globe size={15} className="text-primary-400 flex-shrink-0" />}
              <h2 className="font-bold text-base text-slate-900 dark:text-white truncate">{title}</h2>
              {isTrade && <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/20 text-accent-400 flex-shrink-0">📈 Trade</span>}
              {isGame  && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 flex-shrink-0">🎮 Oyun</span>}
            </div>
            <button 
              onClick={onClose} 
              className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-dark-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-dark-600 transition-colors"
            >
              <X size={15} />
            </button>
          </div>

          <div className="p-4 sm:p-6 flex flex-col gap-5">
            {images?.length > 0 && <ImageGallery images={images} />}
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
            {details && (
              <div className="bg-slate-50 dark:bg-dark-700/60 rounded-xl p-4 border border-slate-200 dark:border-dark-600">
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5"><Info size={12} className="text-primary-400" /> Detaylar</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 whitespace-pre-line">{details}</p>
              </div>
            )}
            {techStack?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {techStack.map(tech => <TagBadge key={tech} label={tech} />)}
              </div>
            )}
            <div className="flex gap-2 pt-1 flex-wrap">
              {hasGame && (
                <button
                  onClick={() => setGameOpen(true)}
                  className="btn-primary text-sm py-2.5 px-5 flex-1 justify-center gap-2"
                >
                  <Gamepad2 size={15} /> Oyunu Oyna
                </button>
              )}
              {showLive && liveUrl && !isGame && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2.5 px-5 flex-1 justify-center">
                  <ExternalLink size={14} /> Canlı Site
                </a>
              )}
              {showGithub && githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2.5 px-5 flex items-center gap-1.5">
                  <Github size={14} /> Kaynak Kod
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {gameOpen && <GameModal project={project} onClose={() => setGameOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ProjectCard({ project }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [gameOpen,  setGameOpen]  = useState(false)
  const { title, description, imageUrl, techStack, liveUrl, githubUrl, category, showGithub, showLive, gameFile } = project
  const isTrade = category === 'trade'
  const isGame  = category === 'game'
  const hasGame = isGame && (gameFile || liveUrl)

  return (
    <>
      <motion.div variants={cardVariants} whileHover={{ y: -6 }} className="card flex flex-col overflow-hidden group">
        <div className="relative bg-slate-100 dark:bg-dark-700 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-32 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-32 sm:h-52 flex items-center justify-center">
              {isTrade && <TrendingUp size={40} className="text-accent-500" />}
              {isGame  && <Gamepad2   size={40} className="text-purple-500" />}
              {!isTrade && !isGame && <Globe size={40} className="text-primary-500" />}
            </div>
          )}
          {isTrade && <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full bg-accent-500/20 text-accent-400 border border-accent-500/30">📈 Trade</span>}
          {isGame  && <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">🎮 Oyun</span>}
        </div>

        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2.5 sm:gap-3">
          <h3 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-white leading-tight mb-0.5">{title}</h3>
          
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 sm:line-clamp-3 flex-1">{description}</p>
          
          {techStack?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {techStack.map(tech => <TagBadge key={tech} label={tech} />)}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 pt-2 sm:pt-3 mt-auto border-t border-slate-100 dark:border-dark-600">
            {hasGame && (
              <button onClick={() => setGameOpen(true)} className="btn-primary text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 flex-1 justify-center gap-1.5">
                <Gamepad2 size={14} /> Oyunu Oyna
              </button>
            )}
            {showLive && liveUrl && !isGame && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 flex-1 justify-center">
                <ExternalLink size={14} /> Canlı Site
              </a>
            )}
            {showGithub && githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 flex-1 justify-center">
                <Github size={14} /> Kaynak Kod
              </a>
            )}
            <button onClick={() => setModalOpen(true)} className="btn-secondary text-sm sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4 flex items-center gap-1.5 flex-1 sm:flex-none justify-center">
              <ArrowUpRight size={14} /> Detaylar
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
        {gameOpen  && <GameModal   project={project} onClose={() => setGameOpen(false)}  />}
      </AnimatePresence>
    </>
  )
}