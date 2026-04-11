import { useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, orderBy, serverTimestamp, setDoc, getDoc, updateDoc, writeBatch
} from 'firebase/firestore';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, useSortable, verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, X, Check, Star } from 'lucide-react';

function SortableProjectRow({ project, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  const categoryLabel =
    project.category === 'trade' ? '📈 Trade' : '🌐 Web';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 border dark:border-dark-700 rounded-2xl flex justify-between items-center group bg-white dark:bg-dark-800 shadow-sm"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 touch-none flex-shrink-0"
        >
          <GripVertical size={18} />
        </button>

        {project.images?.[0] && (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          />
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium dark:text-gray-200 text-sm truncate">{project.title}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-dark-700 flex-shrink-0">
              {categoryLabel}
            </span>
            {project.featured && (
              <span className="text-xs text-yellow-500 flex-shrink-0">⭐ One Cikan</span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate">{project.shortDescription}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-shrink-0 ml-2">
        <button
          onClick={() => onEdit(project)}
          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          title="Duzenle"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          title="Sil"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pendingOrder, setPendingOrder] = useState(false);

  const EMPTY_FORM = {
    title: '', shortDescription: '', details: '', technologies: '',
    img1: '', img2: '', img3: '', github: '', demo: '',
    category: 'web', featured: false, showGithub: true, showLive: true,
  };
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const [siteData, setSiteData] = useState({
    homeTitle: '',
    aboutMe: '',
    technicalAnalysis: '',
    coursesTaken: '',
  });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const fetchAllData = async () => {
    try {
      const projSnap = await getDocs(collection(db, 'projects'));
      const allProjects = projSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      allProjects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setProjects(allProjects);

      const qMessages = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const mSnap = await getDocs(qMessages);
      setMessages(mSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const settingsSnap = await getDoc(doc(db, 'siteSettings', 'general'));
      if (settingsSnap.exists()) setSiteData(settingsSnap.data());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchAllData(); }, []);

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      title: form.title,
      shortDescription: form.shortDescription,
      details: form.details,
      technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean),
      images: [form.img1, form.img2, form.img3].filter(Boolean),
      github: form.github,
      demo: form.demo,
      category: form.category,
      featured: form.featured,
      showGithub: form.showGithub,
      showLive: form.showLive,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), payload);
        alert('Proje guncellendi!');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...payload,
          order: projects.length,
          createdAt: serverTimestamp(),
        });
        alert('Proje eklendi!');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      fetchAllData();
    } catch (err) { alert('Hata: ' + err.message); }
    setLoading(false);
  };

  const startEdit = (project) => {
    setForm({
      title: project.title || '',
      shortDescription: project.shortDescription || '',
      details: project.details || '',
      technologies: (project.technologies || []).join(', '),
      img1: project.images?.[0] || '',
      img2: project.images?.[1] || '',
      img3: project.images?.[2] || '',
      github: project.github || '',
      demo: project.demo || '',
      category: project.category || 'web',
      featured: project.featured || false,
      showGithub: project.showGithub ?? true,
      showLive: project.showLive ?? true,
    });
    setEditingId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = projects.findIndex(p => p.id === active.id);
    const newIndex = projects.findIndex(p => p.id === over.id);
    setProjects(arrayMove(projects, oldIndex, newIndex));
    setPendingOrder(true);
  };

  const handleSaveOrder = async () => {
    setLoading(true);
    try {
      const batch = writeBatch(db);
      projects.forEach((p, i) => {
        batch.update(doc(db, 'projects', p.id), { order: i });
      });
      await batch.commit();
      setPendingOrder(false);
      alert('Siralama kaydedildi!');
    } catch (err) { alert('Hata: ' + err.message); }
    setLoading(false);
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'siteSettings', 'general'), { ...siteData, updatedAt: serverTimestamp() });
      alert('Site icerigi guncellendi!');
    } catch { alert('Hata olustu!'); }
    setLoading(false);
  };

  const deleteItem = async (col, id) => {
    if (window.confirm('Silmek istedigine emin misin?')) {
      await deleteDoc(doc(db, col, id));
      fetchAllData();
    }
  };

  const inputClass = 'w-full p-3 rounded-xl border border-slate-200 dark:border-dark-600 bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all text-sm';
  const checkboxClass = 'w-4 h-4 text-primary-600 bg-slate-100 border-slate-300 rounded focus:ring-primary-500';
  const tabClass = (id) =>
    `px-3 sm:px-6 py-2 rounded-xl font-bold transition-all text-sm whitespace-nowrap ${
      activeTab === id
        ? 'bg-primary-600 text-white shadow-lg'
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-dark-700'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 pt-10 pb-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Ust bar */}
        <div className="bg-white dark:bg-dark-800 p-4 sm:p-6 rounded-3xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold dark:text-white">Kontrol Merkezi</h1>
              <p className="text-sm text-slate-500">Projeler, mesajlar ve site metinleri.</p>
            </div>
            <button
              onClick={() => { auth.signOut(); navigate('/admin'); }}
              className="text-red-500 font-bold text-sm px-4 py-2 hover:bg-red-50 rounded-xl transition-colors"
            >
              Cikis
            </button>
          </div>
          <div className="flex gap-1 bg-slate-50 dark:bg-dark-900 p-1.5 rounded-2xl overflow-x-auto">
            <button onClick={() => setActiveTab('projects')} className={tabClass('projects')}>Projeler</button>
            <button onClick={() => setActiveTab('settings')} className={tabClass('settings')}>Site Ayarlari</button>
            <button onClick={() => setActiveTab('messages')} className={tabClass('messages')}>Mesajlar</button>
          </div>
        </div>

        {/* PROJELER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">

            {/* Form */}
            <form onSubmit={handleSubmitProject} className="bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold dark:text-white">
                  {editingId ? 'Projeyi Duzenle' : 'Yeni Proje Ekle'}
                </h3>
                {editingId && (
                  <button type="button" onClick={cancelEdit} className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition-colors">
                    <X size={15} /> Iptal
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Baslik *"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Teknolojiler (React, Node...)"
                  value={form.technologies}
                  onChange={e => setForm({ ...form, technologies: e.target.value })}
                  className={inputClass}
                />
              </div>

              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className={inputClass}
              >
                <option value="web">Yurt Ici Web Sitesi</option>
                <option value="trade">Kripto / Trade</option>
              </select>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Gorsel 1 URL *"
                  value={form.img1}
                  onChange={e => setForm({ ...form, img1: e.target.value })}
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Gorsel 2 URL"
                  value={form.img2}
                  onChange={e => setForm({ ...form, img2: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Gorsel 3 URL"
                  value={form.img3}
                  onChange={e => setForm({ ...form, img3: e.target.value })}
                  className={inputClass}
                />
              </div>

              {(form.img1 || form.img2 || form.img3) && (
                <div className="flex gap-2 flex-wrap">
                  {[form.img1, form.img2, form.img3].filter(Boolean).map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Onizleme ${i + 1}`}
                      className="w-20 h-14 object-cover rounded-lg border border-slate-200 dark:border-dark-600"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ))}
                </div>
              )}

              <textarea
                placeholder="Kisa Aciklama (kartta gorunur)"
                value={form.shortDescription}
                onChange={e => setForm({ ...form, shortDescription: e.target.value })}
                rows="2"
                className={inputClass}
              />

              <textarea
                placeholder="Genis Detaylar (modal icinde)"
                value={form.details}
                onChange={e => setForm({ ...form, details: e.target.value })}
                rows="4"
                className={inputClass}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="GitHub Linki"
                  value={form.github}
                  onChange={e => setForm({ ...form, github: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Canli Demo Linki"
                  value={form.demo}
                  onChange={e => setForm({ ...form, demo: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-wrap gap-5 items-center border-t border-slate-100 dark:border-dark-700 pt-4">
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                    className={checkboxClass}
                  />
                  <Star size={14} className="text-yellow-400" />
                  One Cikan
                  <span className="text-xs text-slate-400">(Ana sayfada gosteRilir)</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.showGithub}
                    onChange={e => setForm({ ...form, showGithub: e.target.checked })}
                    className={checkboxClass}
                  />
                  GitHub linkini goster
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.showLive}
                    onChange={e => setForm({ ...form, showLive: e.target.checked })}
                    className={checkboxClass}
                  />
                  Canli site linkini goster
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
              >
                {loading
                  ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <Check size={18} />
                }
                {editingId ? 'Degisiklikleri Kaydet' : 'Projeyi Ekle'}
              </button>
            </form>

            {/* Proje listesi */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="font-bold dark:text-white text-lg">
                  Yayindaki Projeler ({projects.length})
                </h3>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-slate-400">Siralamak icin surukle</p>
                  {pendingOrder && (
                    <button
                      onClick={handleSaveOrder}
                      disabled={loading}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-60"
                    >
                      <Check size={13} /> Sirayi Guncelle
                    </button>
                  )}
                </div>
              </div>

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-3">
                    {projects.map(p => (
                      <SortableProjectRow
                        key={p.id}
                        project={p}
                        onEdit={startEdit}
                        onDelete={(id) => deleteItem('projects', id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              {projects.length === 0 && (
                <p className="text-center text-slate-400 py-8">Henuz proje eklenmedi.</p>
              )}
            </div>
          </div>
        )}

        {/* SITE AYARLARI */}
        {activeTab === 'settings' && (
          <form onSubmit={handleUpdateSettings} className="bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold dark:text-white border-b pb-4">Site Metinlerini Yonet</h3>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-slate-300">Ana Sayfa Karsilama Yazisi</label>
                <input
                  type="text"
                  value={siteData.homeTitle || ''}
                  onChange={e => setSiteData({ ...siteData, homeTitle: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-slate-300">Hakkimda Metni</label>
                <textarea
                  value={siteData.aboutMe || ''}
                  onChange={e => setSiteData({ ...siteData, aboutMe: e.target.value })}
                  rows="6"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-slate-300">Teknik Analiz ve Trading Vizyonu</label>
                <textarea
                  value={siteData.technicalAnalysis || ''}
                  onChange={e => setSiteData({ ...siteData, technicalAnalysis: e.target.value })}
                  rows="4"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 dark:text-slate-300">Aldigim Dersler (virgülle ayir)</label>
                <input
                  type="text"
                  value={siteData.coursesTaken || ''}
                  onChange={e => setSiteData({ ...siteData, coursesTaken: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all"
            >
              {loading ? 'Kaydediliyor...' : 'Guncelle'}
            </button>
          </form>
        )}

        {/* MESAJLAR */}
        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold dark:text-white mb-6">Gelen Mesajlar ({messages.length})</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {messages.map(m => (
                <div key={m.id} className="p-5 bg-slate-50 dark:bg-dark-900 rounded-2xl relative group">
                  <button
                    onClick={() => deleteItem('messages', m.id)}
                    className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                  <h4 className="font-bold text-primary-600 text-sm">{m.name}</h4>
                  <p className="text-[10px] text-slate-400 mb-3">{m.email}</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic">"{m.message}"</p>
                  <div className="mt-4 text-[9px] text-slate-400 text-right">
                    {m.createdAt?.toDate().toLocaleString('tr-TR')}
                  </div>
                </div>
              ))}
            </div>
            {messages.length === 0 && (
              <p className="text-center text-slate-400 py-8">Henuz mesaj yok.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
