import api from './api'

export const MOCK_COURSES = [
  { id: '1', name: 'Veri Yapıları ve Algoritmalar', category: 'core' },
  { id: '2', name: 'Nesne Yönelimli Programlama', category: 'core' },
  { id: '3', name: 'Veritabanı Yönetim Sistemleri', category: 'database' },
  { id: '4', name: 'Yapay Zeka', category: 'ai' },
  { id: '5', name: 'Web Geliştirme', category: 'web' },
  { id: '6', name: 'Mobil Programlama', category: 'mobile' },
  { id: '7', name: 'Bilgisayar Ağları', category: 'network' },
  { id: '8', name: 'Görsel Programlama', category: 'software' },
  { id: '9', name: 'Büyük Veri Analizi', category: 'data' },
  { id: '10', name: 'Veri Analizi', category: 'data' },
  { id: '11', name: 'Araştırma Yöntemleri', category: 'academic' },
  { id: '12', name: 'İnsan ve Performans Teknolojileri', category: 'management' },
  { id: '13', name: 'E-Ticaret', category: 'web' },
  { id: '14', name: 'İnternet Programlama', category: 'web' },
  { id: '15', name: 'İstatistik', category: 'math' },
  { id: '16', name: 'Elektrik Devre Elemanları', category: 'hardware' },
  { id: '17', name: 'Grafik Tasarım', category: 'design' },
  { id: '18', name: 'İşletim Sistemleri', category: 'core' }
]

// Sitenin genel tonuna uygun, tek tip nötr palette
const NEUTRAL = 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/60'

const CATEGORY_COLORS = {
  core:       NEUTRAL,
  web:        NEUTRAL,
  database:   NEUTRAL,
  network:    NEUTRAL,
  software:   NEUTRAL,
  ai:         NEUTRAL,
  mobile:     NEUTRAL,
  security:   NEUTRAL,
  math:       NEUTRAL,
  management: NEUTRAL,
  academic:   NEUTRAL,
  data:       NEUTRAL,
  hardware:   NEUTRAL,
  design:     NEUTRAL,
}

export const getCategoryColor = (category) =>
  CATEGORY_COLORS[category] || NEUTRAL

export const getCourses = async () => {
  try {
    const response = await api.get('/courses')
    return response.data
  } catch {
    return MOCK_COURSES
  }
}