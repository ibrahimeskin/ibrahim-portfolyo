const TECH_COLORS = {
  React:          'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Node.js':      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  MongoDB:        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  MySQL:          'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Express:        'bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300',
  'Tailwind CSS': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  JavaScript:     'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  TypeScript:     'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Python:         'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  'Pine Script':  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  TradingView:    'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  HTML:           'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  CSS3:           'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  Vite:           'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  JWT:            'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'REST API':     'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  'Framer Motion':'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
}

const DEFAULT_COLOR = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'

export default function TagBadge({ label, className = '' }) {
  const color = TECH_COLORS[label] || DEFAULT_COLOR
  return (
    <span className={`tag text-xs ${color} ${className}`}>
      {label}
    </span>
  )
}
