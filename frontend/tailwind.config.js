/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coy: {
          pink: '#ff2d78',
          'pink-hover': '#e0246a',
          ink: '#18181b',
          canvas: '#ffffff',
          surface: '#ffffff',
          subtle: '#f4f4f5',
          'muted-dark': '#52525b',
          muted: '#71717a',
          'pink-tint': '#fff0f5',
          green: '#00e676',
          'green-dark': '#00c853',
          'green-tint': '#dcfce7',
          pass: '#ff2d55',
          'pass-dark': '#e01e44',
          'pass-tint': '#ffe5ea',
          whatsapp: '#25d366',
        }
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'hard-sm': '2px 2px 0px #18181b',
        'hard': '4px 4px 0px #18181b',
        'hard-md': '6px 6px 0px #18181b',
        'hard-lg': '8px 8px 0px #18181b',
        'hard-pink': '4px 4px 0px #ff2d78',
      },
      borderWidth: {
        '2': '2px',
        '3': '3px',
      }
    },
  },
  plugins: [],
}
