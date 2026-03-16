import { alpha, createTheme } from '@mui/material/styles';
import type { EventConfig } from '../types/event';
import { getThemeTokens } from '../data/eventHelpers';

export function buildPartyTheme(event: EventConfig) {
  const tokens = getThemeTokens(event);

  return createTheme({
    palette: {
      mode: 'dark',
      primary: { main: tokens.palette.primary },
      secondary: { main: tokens.palette.secondary },
      success: { main: tokens.palette.accent },
      warning: { main: tokens.palette.highlight },
      background: {
        default: '#070910',
        paper: tokens.palette.paper
      }
    },
    shape: { borderRadius: 20 },
    typography: {
      fontFamily: tokens.fonts.body,
      h1: { fontFamily: tokens.fonts.display, letterSpacing: 1.5, textTransform: 'uppercase' },
      h2: { fontFamily: tokens.fonts.display, letterSpacing: 1.2, textTransform: 'uppercase' },
      h3: { fontFamily: tokens.fonts.display, letterSpacing: 1.1, textTransform: 'uppercase' },
      h4: { fontFamily: tokens.fonts.display, letterSpacing: 1.1, textTransform: 'uppercase' },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(14px)',
            border: `1px solid ${alpha('#ffffff', 0.08)}`,
            boxShadow: `0 18px 50px ${alpha(tokens.palette.primary, 0.18)}`
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            textTransform: 'none',
            fontWeight: 800,
            paddingInline: 18
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700
          }
        }
      }
    }
  });
}
