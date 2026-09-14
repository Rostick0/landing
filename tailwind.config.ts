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
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
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
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)'
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: []
}
