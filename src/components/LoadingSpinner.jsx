import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 min-h-[300px] w-full">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Dış halka - Saat yönünde döner */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary-500/80"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Orta halka - Saat yönünün tersine döner */}
        <motion.div
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-accent-500/80"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* İçerideki nabız atan merkez */}
        <motion.div
          className="w-4 h-4 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] dark:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>
    </div>
  )
}