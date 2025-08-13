/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // subtle warm gray
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // deep forest green
        background: 'var(--color-background)', // warm off-white
        foreground: 'var(--color-foreground)', // near-black with warm undertones
        primary: {
          DEFAULT: 'var(--color-primary)', // deep forest green
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // rich earth brown
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // strong red
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // subtle warm gray
          foreground: 'var(--color-muted-foreground)', // medium gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // vibrant harvest orange
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // near-black with warm undertones
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // near-black with warm undertones
        },
        success: {
          DEFAULT: 'var(--color-success)', // vibrant healthy green
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // golden yellow
          foreground: 'var(--color-warning-foreground)', // near-black with warm undertones
        },
        error: {
          DEFAULT: 'var(--color-error)', // strong red
          foreground: 'var(--color-error-foreground)', // white
        },
        surface: {
          DEFAULT: 'var(--color-surface)', // subtle warm gray
          foreground: 'var(--color-surface-foreground)', // near-black with warm undertones
        },
        'text-primary': 'var(--color-text-primary)', // near-black with warm undertones
        'text-secondary': 'var(--color-text-secondary)', // medium gray
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'mono-normal': '400',
      },
      borderRadius: {
        'agricultural-sm': '4px',
        'agricultural-md': '8px',
        'agricultural-lg': '12px',
      },
      boxShadow: {
        'agricultural-sm': 'var(--shadow-sm)',
        'agricultural-md': 'var(--shadow-md)',
        'agricultural-lg': 'var(--shadow-lg)',
      },
      backdropBlur: {
        'agricultural': '8px',
      },
      transitionDuration: {
        'agricultural': '200ms',
        'spatial': '300ms',
      },
      transitionTimingFunction: {
        'agricultural': 'ease-out',
        'spatial': 'ease-in-out',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        'header': '1000',
        'tabs': '900',
        'sidebar': '800',
        'dropdown': '1100',
        'modal': '1200',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}