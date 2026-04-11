import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Rocket, MessageCircle, User, ChevronRight, Mail,
  ExternalLink, Github, TrendingUp, Globe, ArrowUpRight, Gamepad2
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeader from '../components/SectionHeader'
import LoadingSpinner from '../components/LoadingSpinner'
import { getFeaturedProjects } from '../services/projectService'
import { ProjectModal, GameModal } from '../components/ProjectCard'
import profilAcik from '../assets/beyazprofil.jpeg' 
import profilKoyu from '../assets/kapalıprofil.jpeg' 

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectListRow({ project, index }) {
  const [modalOpen, setModalOpen] = useState(false)
  
  const { title, description, imageUrl, techStack, liveUrl, githubUrl, category, gameFile } = project
  const isTrade = category === 'trade'
  const isGame  = category === 'game'
  const hasGame = isGame && (gameFile || liveUrl)
  const [gameOpen, setGameOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        onClick={() => setModalOpen(true)}
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-dark-700 bg-white dark:bg-dark-800/60 hover:border-primary-500/30 hover:shadow-sm transition-all duration-200 cursor-pointer"
      >
        {/* GÜNCELLEME: Flex sütunları yerine Float (kaydırma) mantığına geçtik */}
        <div className="flex-1 w-full block">
          
          {/* Fotoğraf (Float Left ile Sola Yaslandı) */}
          <div className="float-left w-32 h-20 sm:w-48 sm:h-32 rounded-lg overflow-hidden bg-slate-100 dark:bg-dark-700 flex items-center justify-center mr-3 sm:mr-4 mb-2 mt-1">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              isTrade
                ? <TrendingUp size={24} className="text-accent-500 opacity-60" />
                : <Globe size={24} className="text-primary-500 opacity-60" />
            )}
          </div>

          {/* Başlık */}
          <div className="flex items-center gap-2 mb-2 flex-wrap pt-0.5">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-base md:text-lg leading-snug group-hover:text-primary-500 transition-colors">
              {title}
            </h3>
            {isTrade && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20 flex-shrink-0">
                📈 Trade
              </span>
            )}
          </div>

          {/* Açıklama (Yazının fotoğrafın altına akması için line-clamp kaldırıldı) */}
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
          
          {/* Kayan elementlerin (float) kutudan taşmasını engellemek için */}
          <div className="clear-both"></div>
        </div>

        {/* Sağ/Alt: Butonlar */}
        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto flex-shrink-0 mt-1 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-dark-700">
          {hasGame ? (
            <button
              onClick={(e) => { 
                e.stopPropagation();
                setGameOpen(true); 
              }}
              className="btn-primary py-2 px-4 gap-1.5 text-sm justify-center flex-1 sm:flex-none z-10"
            >
              <Gamepad2 size={14} />
              Oyna
            </button>
          ) : liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-primary py-2 px-4 gap-1.5 text-sm justify-center flex-1 sm:flex-none z-10"
            >
              <ExternalLink size={14} />
              Canlı Site
            </a>
          ) : (
            <span className="flex items-center justify-center text-xs text-slate-400 dark:text-slate-500 px-4 py-2 rounded-xl border border-dashed border-slate-200 dark:border-dark-600 whitespace-nowrap flex-1 sm:flex-none">
              Demo Yok
            </span>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              setModalOpen(true);
            }}
            className="btn-secondary py-2 px-4 gap-1.5 text-sm justify-center flex-1 sm:flex-none z-10"
          >
            <ArrowUpRight size={14} />
            Detaylar
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={project} onClose={() => setModalOpen(false)} />
        )}
        {gameOpen && (
          <GameModal project={project} onClose={() => setGameOpen(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default function Home() {
  const [projects, setProjects]   = useState([])
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    getFeaturedProjects()
      .then(setProjects)
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageTransition>
      {/* ── Hero Bölümü ── */}
      <section className="relative pt-24 pb-12 md:pt-40 md:pb-24 overflow-hidden">
        <div className="blur-dot w-96 h-96 bg-primary-500 -top-20 -right-40" />
        <div className="blur-dot w-72 h-72 bg-accent-500 bottom-20 -left-32" />
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center items-center order-1 md:order-2"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-primary-500/20"
              />
              <div className="w-52 h-52 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border-2 border-primary-500/30 flex items-center justify-center animate-float glow-blue overflow-hidden z-10">
                <img src={profilAcik} alt="İbrahim" className="w-full h-full object-cover block dark:hidden" />
                <img src={profilKoyu} alt="İbrahim" className="w-full h-full object-cover hidden dark:block" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-start text-center md:text-left gap-6 order-2 md:order-1"
          >
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold leading-tight flex flex-col items-center md:items-start"
            >
              <span className="text-5xl sm:text-6xl md:text-7xl text-slate-900 dark:text-white">
                İbrahim Eskin
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl text-blue-600 dark:text-blue-400 mt-1 md:mt-2">
                Yazılım Geliştiricisi
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed w-full text-justify"
            >
              Merhaba, modern web teknolojilerini kullanarak dinamik ve etkileşimli projeler geliştiriyorum. Analitik bakış açımı kodlamayla birleştirerek hem güçlü web uygulamalar inşa ediyor hem de finansal piyasalar için özel indikatörler üretiyorum.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <Link to="/projeler" className="btn-primary">
                <Rocket size={16} />
                Projeler
                <ArrowRight size={14} />
              </Link>
              <Link to="/iletisim" className="btn-secondary">
                <MessageCircle size={16} />
                İletişim
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Hakkımda Kartı ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 md:mb-20">
        <ScrollReveal>
          <Link to="/hakkimda">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl border border-primary-500/20 bg-gradient-to-r from-primary-500/5 via-white to-accent-500/5 dark:from-primary-500/10 dark:via-dark-800 dark:to-accent-500/10 p-5 md:p-6 flex flex-row items-center gap-4 md:gap-6 group cursor-pointer transition-all duration-200 hover:border-primary-500/40 hover:shadow-md"
            >
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
              <div className="absolute right-16 bottom-0 w-20 h-20 bg-accent-500/5 rounded-full -mb-8 pointer-events-none" />

              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
                <User size={22} className="text-primary-500" />
              </div>

              <div className="flex-1 min-w-0 relative z-10">
                <h3 className="font-display font-semibold text-slate-900 dark:text-white text-base md:text-lg leading-snug">
                  Beni Daha İyi Tanıyın
                </h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Eğitimim, ilgi alanlarım ve geçmişim hakkında daha fazla bilgi edin.
                </p>
              </div>

              <div className="flex-shrink-0 relative z-10 w-8 h-8 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-all duration-200">
                <ChevronRight size={16} className="text-primary-500 group-hover:text-white transition-colors duration-200" />
              </div>
            </motion.div>
          </Link>
        </ScrollReveal>
      </section>

      {/* ── Projeler Bölümü (Liste) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 md:pb-24">
        <SectionHeader
          title="Öne Çıkan Çalışmalar"
          subtitle="En güncel projelerimden bazıları."
          center={true}
        />
        {loading ? (
          <LoadingSpinner text="Yükleniyor..." />
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((p, i) => (
              <ProjectListRow key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="flex justify-center mt-8">
            <Link to="/projeler" className="btn-secondary gap-2">
              Tüm Projeleri Gör
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
      </section>

      {/* ── Birlikte İnşa Edelim ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 md:pb-12">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-dark-800/50 border border-slate-100 dark:border-dark-700 p-8 md:p-12 text-center md:text-left">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
                Benimle İletişime Geçin
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-10 text-justify md:text-left">
                İş birliği yapmakla ilgileniyor musunuz veya sadece sohbet mi etmek istiyorsunuz? 
                Bana her zaman ulaşabilir, fikirlerinizi paylaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <a href="mailto:iletisim@ibrahimeskin.com" className="btn-primary px-8 w-full sm:w-auto justify-center">
                  <Mail size={18} />
                  E-posta Gönder
                </a>
                <Link to="/iletisim" className="btn-secondary px-8 w-full sm:w-auto justify-center">
                  <MessageCircle size={18} />
                  Mesaj Bırak
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  )
}