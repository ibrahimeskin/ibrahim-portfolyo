import ScrollReveal from './ScrollReveal'

export default function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <ScrollReveal className="flex flex-col items-center md:items-start text-center md:text-left mb-14">
      
      {/* Üst Küçük Başlık (Rozet) */}
      {eyebrow && (
        <span className="inline-block text-xs font-mono tracking-widest uppercase text-primary-400 mb-3 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5">
          {eyebrow}
        </span>
      )}

      {/* Ana Başlık */}
      <h2 className="section-title w-full">
        {title}
      </h2>

      {/* Alt Açıklama - mx-auto mobilde ortalar, md:mx-0 masaüstünde sola çeker */}
      {subtitle && (
        <p className="section-subtitle max-w-xl mx-auto md:mx-0 mt-2">
          {subtitle}
        </p>
      )}

    </ScrollReveal>
  )
}