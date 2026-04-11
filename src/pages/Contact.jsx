import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Instagram, Twitter, Github, Linkedin, Mail, Send,
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import SectionHeader from '../components/SectionHeader'
import ScrollReveal from '../components/ScrollReveal'
import { sendContactMessage } from '../services/contactService'
import { SOCIAL_LINKS } from '../services/socialLinks'

const ICON_MAP = { Instagram, Twitter, Github, Linkedin, Mail, Send }

const FORM_INITIAL = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm]     = useState(FORM_INITIAL)
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  const contactLinks = SOCIAL_LINKS.filter((s) => s.id !== 'instagram-trade')

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    setErrMsg('')
    const result = await sendContactMessage(form)
    if (result.success) {
      setStatus('success')
      setForm(FORM_INITIAL)
    } else {
      setStatus('error')
      setErrMsg(result.error || 'Mesaj gönderilemedi. Lütfen tekrar dene.')
    }
  }

  return (
    <PageTransition>
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6">

        <SectionHeader
          
          title="Benimle İletişime Geçin"
          subtitle="Bir projen mi var? Sohbet etmek mi istiyorsun? Her zaman buradayım."
        />

        <div className="grid md:grid-cols-2 gap-8 items-stretch">

          {/* ── Sol: Form ── */}
          <ScrollReveal delay={0.05} className="h-full">
            <div className="card p-8 h-full flex flex-col">
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-6">
                Mesaj Gönder
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                {/* İsim */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    İsim
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Adın Soyadın"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-700 border border-slate-200 dark:border-dark-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                  />
                </div>

                {/* E-Posta */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="ornek@mail.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-700 border border-slate-200 dark:border-dark-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                  />
                </div>

                {/* Mesaj — flex-1 ile kalan alanı doldurur, iki taraf eşitlenir */}
                <div className="flex flex-col flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Mesaj
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Mesajınız.."
                    className="w-full flex-1 min-h-[120px] px-4 py-3 rounded-xl bg-slate-50 dark:bg-dark-700 border border-slate-200 dark:border-dark-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all resize-none"
                  />
                </div>

                {/* Durum Mesajları */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-accent-500 bg-accent-500/10 border border-accent-500/20 rounded-xl px-4 py-3 text-sm"
                  >
                    <CheckCircle2 size={16} />
                    Mesajın başarıyla gönderildi! En kısa sürede döneceğim.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm"
                  >
                    <AlertCircle size={16} />
                    {errMsg}
                  </motion.div>
                )}

                {/* Gönder Butonu — her zaman en altta */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed mt-auto"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Mesajı Gönder
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>

          {/* ── Sağ: Sosyal Medya ── */}
          <ScrollReveal delay={0.15} className="h-full">
            <div className="flex flex-col gap-4 h-full">
              <div>
                <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-1">
                  Sosyal Medya & Direkt İletişim
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Forma uğraşmadan doğrudan ulaşmak istersen aşağıdaki kanallardan bana yazabilirsin.
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {contactLinks.map((link, i) => {
                  const Icon = ICON_MAP[link.icon] || Mail
                  return (
                    <motion.a
                      key={link.id}
                      href={link.url}
                      target={link.url.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 4, scale: 1.01 }}
                      className="flex items-center gap-4 p-4 card hover:border-primary-500/30 hover:shadow-md group transition-all duration-200 flex-1"
                    >
                      <div className={`w-11 h-11 rounded-xl bg-slate-100 dark:bg-dark-700 flex items-center justify-center shrink-0 group-hover:bg-primary-500/10 transition-colors ${link.color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{link.label}</p>
                        {link.display && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">{link.display}</p>
                        )}
                        {link.badge && (
                          <span className="text-xs bg-accent-500/15 text-accent-500 px-1.5 py-0.5 rounded font-medium">
                            {link.badge}
                          </span>
                        )}
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </PageTransition>
  )
}