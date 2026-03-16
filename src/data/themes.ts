import type { PartyThemeKey, ThemeTokens } from '../types/event';

export const themeLibrary: Record<PartyThemeKey, ThemeTokens> = {
  'stranger-things': {
    title: 'Stranger Things Birthday Bash',
    palette: {
      primary: '#C1121F',
      secondary: '#1E1B2E',
      accent: '#6D28D9',
      highlight: '#F59E0B',
      paper: 'rgba(13, 15, 28, 0.82)',
      textGlow: 'rgba(193,18,31,0.35)'
    },
    overlay: 'radial-gradient(circle at top, rgba(193,18,31,0.28), rgba(7,9,19,0.93) 64%)',
    fonts: {
      display: `'Bebas Neue', 'Impact', 'Roboto', sans-serif`,
      body: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
    }
  },
  space: {
    title: 'Space Explorer Party',
    palette: {
      primary: '#1D3557',
      secondary: '#274C77',
      accent: '#60A5FA',
      highlight: '#E0FBFC',
      paper: 'rgba(10, 18, 36, 0.82)',
      textGlow: 'rgba(96,165,250,0.3)'
    },
    overlay: 'radial-gradient(circle at top, rgba(96,165,250,0.2), rgba(3,8,24,0.92) 64%)',
    fonts: {
      display: `'Orbitron', 'Roboto', sans-serif`,
      body: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
    }
  },
  jungle: {
    title: 'Jungle Adventure Party',
    palette: {
      primary: '#386641',
      secondary: '#2D4739',
      accent: '#84CC16',
      highlight: '#F4D35E',
      paper: 'rgba(18, 31, 22, 0.82)',
      textGlow: 'rgba(132,204,22,0.3)'
    },
    overlay: 'radial-gradient(circle at top, rgba(56,102,65,0.24), rgba(8,18,10,0.92) 64%)',
    fonts: {
      display: `'Bebas Neue', 'Impact', 'Roboto', sans-serif`,
      body: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
    }
  },
  princess: {
    title: 'Princess Party',
    palette: {
      primary: '#DB2777',
      secondary: '#7C3AED',
      accent: '#F9A8D4',
      highlight: '#FDE68A',
      paper: 'rgba(44, 16, 56, 0.82)',
      textGlow: 'rgba(249,168,212,0.3)'
    },
    overlay: 'radial-gradient(circle at top, rgba(219,39,119,0.24), rgba(26,8,28,0.92) 64%)',
    fonts: {
      display: `'Bebas Neue', 'Impact', 'Roboto', sans-serif`,
      body: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
    }
  },
  superhero: {
    title: 'Superhero Party',
    palette: {
      primary: '#DC2626',
      secondary: '#1D4ED8',
      accent: '#FACC15',
      highlight: '#F8FAFC',
      paper: 'rgba(16, 20, 40, 0.82)',
      textGlow: 'rgba(250,204,21,0.28)'
    },
    overlay: 'radial-gradient(circle at top, rgba(220,38,38,0.24), rgba(10,14,26,0.93) 64%)',
    fonts: {
      display: `'Bebas Neue', 'Impact', 'Roboto', sans-serif`,
      body: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
    }
  },
  lilo: {
    title: 'Lilo and Stitch Party',
    palette: {
      primary: '#0EA5E9',
      secondary: '#0B3A5B',
      accent: '#22D3EE',
      highlight: '#F97316',
      paper: 'rgba(8, 32, 52, 0.82)',
      textGlow: 'rgba(34,211,238,0.3)'
    },
    overlay: 'radial-gradient(circle at top, rgba(14,165,233,0.24), rgba(6,20,30,0.92) 64%)',
    fonts: {
      display: `'Bebas Neue', 'Impact', 'Roboto', sans-serif`,
      body: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
    }
  },
  moana: {
    title: 'Moana Party',
    palette: {
      primary: '#14B8A6',
      secondary: '#0B4A5A',
      accent: '#2DD4BF',
      highlight: '#F59E0B',
      paper: 'rgba(7, 35, 44, 0.82)',
      textGlow: 'rgba(45,212,191,0.3)'
    },
    overlay: 'radial-gradient(circle at top, rgba(20,184,166,0.24), rgba(6,18,24,0.92) 64%)',
    fonts: {
      display: `'Bebas Neue', 'Impact', 'Roboto', sans-serif`,
      body: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`
    }
  }
};
