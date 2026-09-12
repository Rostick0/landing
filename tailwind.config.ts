import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './app/**/*.{vue,js,ts}',
    './error.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#eef1f7',
          100: '#d7dced',
          200: '#a9b2ca',
          300: '#7a86a8',
          400: '#4b5578',
          500: '#2c334f',
          600: '#1c2138',
          700: '#141728',
          750: '#101321',
          800: '#0c0e1a',
          850: '#090b14',
          900: '#06070f',
          950: '#030409'
        },
        spark: {
          50: '#eafdff',
          100: '#c9f8ff',
          200: '#96f0fd',
          300: '#5fe4fb',
          400: '#38d6f5',
          500: '#1fb9de',
          600: '#1592b3',
          700: '#136f8b',
          800: '#135a70',
          900: '#134a5c'
        }
      },
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace'
        ]
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56, 214, 245, 0.25), 0 0 24px 0 rgba(56, 214, 245, 0.18)',
        'glow-lg': '0 0 0 1px rgba(56, 214, 245, 0.3), 0 0 60px 0 rgba(56, 214, 245, 0.22)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)'
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(60% 60% at 50% 0%, rgba(56, 214, 245, 0.14) 0%, rgba(56, 214, 245, 0) 60%)',
        'grid-lines':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)'
      },
      backgroundSize: {
        grid: '48px 48px'
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-glow': 'pulse-glow 3.2s ease-in-out infinite'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
}
