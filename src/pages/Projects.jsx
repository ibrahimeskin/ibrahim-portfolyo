import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getAllProjects } from '../services/projectService'

const FILTERS = [
  { value: 'all',   label: 'Tümü' },
  { value: 'web',   label: '🌐 Web & Yazılım' },
  { value: 'trade', label: '📈 Trade' },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .catch(() => setError('Projeler yüklenirken hata oluştu.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <PageTransition>
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Tüm Projeler" />
        <div className="flex gap-2 justify-center mb-10 flex-wrap">
          {FILTERS.map(({ value, label }) => (
            <motion.button
              key={value}
              onClick={() => setFilter(value)}
              whileTap={{ scale: 0.96 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                filter === value
                  ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                  : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-dark-600 hover:border-primary-500/40'
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>
        {loading ? (
          <LoadingSpinner text="Projeler yükleniyor..." />
        ) : error ? (
          <div className="text-center py-16 text-slate-400">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary mt-4">Tekrar Dene</button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p>Bu kategoride henüz proje yok.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        {!loading && !error && (
          <p className="text-center text-sm text-slate-400 mt-8">{filtered.length} proje gösteriliyor</p>
        )}
      </div>
    </PageTransition>
  )
}