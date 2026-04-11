import { useTheme } from '../context/ThemeContext'

// Convenience re-export — kullanımı: const { isDark, toggleTheme } = useDarkMode()
export function useDarkMode() {
  return useTheme()
}
