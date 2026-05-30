import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // These match the CSS variable names set in globals.css
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E3A5F',
          900: '#0F1F3D',
          950: '#060E1F',
        },
        // Extend cyan so text-cyan-400 / bg-cyan-500 etc. all work
        cyan: {
          '300': '#67E8F9',
          '400': '#22D3EE',
          '500': '#06B6D4',
          '600': '#0891B2',
        },
        navy: {
          '950': '#060E1F',
          '900': '#0F1F3D',
          '800': '#1E3A5F',
        },
      },
      // Custom background images used in dashboard layout
      backgroundImage: {
        'mesh-gradient': `
          radial-gradient(ellipse at 20% 0%,   rgba(6,182,212,0.07) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 100%, rgba(139,92,246,0.05) 0%, transparent 60%)
        `,
        'grid-navy': `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306B6D4' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z'/%3E%3C/g%3E%3C/svg%3E")`,
      },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-out forwards',
        'slide-up':      'slideUp 0.4s ease-out forwards',
        'slide-right':   'slideRight 0.3s ease-out forwards',
        'scale-in':      'scaleIn 0.3s ease-out forwards',
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'glow':          'glow 2s ease-in-out infinite alternate',
        'wave':          'wave 1.4s ease-in-out infinite',
        'shimmer':       'shimmer 2.2s linear infinite',
        'float':         'float 6s ease-in-out infinite',
        'spin-slow':     'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:       { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:      { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideRight:   { from: { opacity: '0', transform: 'translateX(-20px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:      { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
        glow:         { from: { boxShadow: '0 0 20px rgba(6,182,212,0.15)' }, to: { boxShadow: '0 0 50px rgba(6,182,212,0.45),0 0 100px rgba(6,182,212,0.1)' } },
        wave:         { '0%,100%': { transform: 'scaleY(0.3)' }, '50%': { transform: 'scaleY(1)' } },
        shimmer:      { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        float:        { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        bounceSubtle: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
      },
      boxShadow: {
        'glow-cyan':  '0 0 30px rgba(6,182,212,0.3)',
        'glow-blue':  '0 0 30px rgba(59,130,246,0.3)',
        'card':       '0 4px 24px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(6,182,212,0.12)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
}

export default config
