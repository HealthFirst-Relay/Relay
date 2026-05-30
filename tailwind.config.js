/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12'
        },
        leaf: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        earth: {
          50: '#fbf7f1',
          100: '#f5ecdc',
          200: '#ead7b5',
          300: '#dcbb87',
          400: '#cb9a5a',
          500: '#b97f3e',
          600: '#9c6532',
          700: '#7d4f2c',
          800: '#5e3c25',
          900: '#3d2818'
        },
        sky2: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7'
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, rgba(254,215,170,0.85) 0%, rgba(187,247,208,0.85) 50%, rgba(224,242,254,0.85) 100%)',
        'sunrise':
          'radial-gradient(ellipse at 50% 100%, #fde68a 0%, #fdba74 25%, #fb923c 55%, #16a34a 100%)',
        'fields':
          'linear-gradient(180deg, #e0f2fe 0%, #bbf7d0 60%, #86efac 100%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        'run-bounce': {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' }
        },
        sun: {
          '0%, 100%': { boxShadow: '0 0 60px 20px rgba(253,186,116,0.6)' },
          '50%': { boxShadow: '0 0 100px 30px rgba(253,186,116,0.85)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'run-bounce': 'run-bounce 1.2s ease-in-out infinite',
        sun: 'sun 4s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite'
      }
    }
  },
  plugins: []
};

