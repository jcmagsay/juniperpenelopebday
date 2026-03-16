import { useEffect, useRef, useState } from 'react';
import { AppBar, Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs, Typography, alpha } from '@mui/material';
import { Cake, House } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { getThemeTokens } from '../data/eventHelpers';
import type { EventConfig } from '../types/event';

type Props = {
  currentEvent: EventConfig;
  pathname: string;
  children: React.ReactNode;
};

const tabValueMap: Record<string, string> = {
  '/': '/',
  '/event': '/event',
  '/countdown': '/countdown',
  '/events': '/events',
  '/easter-eggs': '/easter-eggs'
};

const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function AppLayout({ currentEvent, pathname, children }: Props) {
  const isStrangerTheme = currentEvent.themeKey === 'stranger-things';
  const [isUpsideDown, setIsUpsideDown] = useState(false);
  const [showDemogorgon, setShowDemogorgon] = useState(false);
  const konamiIndex = useRef(0);
  const cakeClicks = useRef<number[]>([]);
  const currentEventPath = `/event/${currentEvent.slug}`;

  const currentTab =
    pathname === '/event' || pathname === currentEventPath
      ? '/event'
      : pathname.startsWith('/event/')
        ? '/events'
        : (tabValueMap[pathname] ?? false);
  const tokens = getThemeTokens(currentEvent);

  useEffect(() => {
    if (!isStrangerTheme) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expectedKey = konamiSequence[konamiIndex.current];

      if (key === expectedKey) {
        konamiIndex.current += 1;
        if (konamiIndex.current === konamiSequence.length) {
          setIsUpsideDown(true);
          konamiIndex.current = 0;
        }
        return;
      }

      konamiIndex.current = key === konamiSequence[0] ? 1 : 0;
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isStrangerTheme]);

  useEffect(() => {
    if (!isUpsideDown) return;
    const timer = window.setTimeout(() => setIsUpsideDown(false), 15000);
    return () => window.clearTimeout(timer);
  }, [isUpsideDown]);

  const handleCakeClick = () => {
    if (!isStrangerTheme) return;

    const now = Date.now();
    cakeClicks.current = [...cakeClicks.current.filter((timestamp) => now - timestamp < 2800), now];
    if (cakeClicks.current.length >= 5) {
      setShowDemogorgon(true);
      cakeClicks.current = [];
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        backgroundImage: `${tokens.overlay}, url(${currentEvent.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,8,14,0.3) 0%, rgba(8,8,14,0.68) 45%, rgba(8,8,14,0.92) 100%)'
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          pb: 8,
          transition: 'transform 700ms ease, filter 700ms ease',
          transform: isUpsideDown ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center center',
          filter: isUpsideDown ? 'grayscale(0.88) saturate(0.55) contrast(1.05)' : 'none'
        }}
      >
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            backdropFilter: 'blur(18px)',
            borderBottom: `1px solid ${alpha('#fff', 0.08)}`,
            backgroundColor: alpha('#05070c', 0.4)
          }}
        >
          <Container maxWidth="xl">
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'stretch', md: 'center' }}
              justifyContent={{ md: 'space-between' }}
              py={2}
              gap={2}
              sx={{ width: '100%', minWidth: 0 }}
            >
              <Stack
                direction={{ xs: 'row', md: 'row' }}
                alignItems="center"
                justifyContent={{ xs: 'space-between', md: 'flex-start' }}
                gap={2}
                sx={{ width: { xs: '100%', md: 'auto' }, minWidth: 0 }}
              >
                <Box
                  sx={{
                    width: { xs: 'auto', md: 'auto' },
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconButton
                    component={RouterLink}
                    to="/"
                    aria-label="Go to home"
                    sx={{
                      borderRadius: '50%',
                      border: `1px solid ${alpha('#fff', 0.16)}`,
                      color: 'text.primary'
                    }}
                  >
                    <House size={18} />
                  </IconButton>
                </Box>

                <Stack
                  direction="row"
                  spacing={1.25}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: { xs: 'auto', md: 'auto' },
                    minWidth: 0,
                    flexShrink: 1,
                    px: { md: 2 }
                  }}
                >
                  <Box sx={{ minWidth: 0, textAlign: 'left' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '0.95rem', sm: '1.25rem' },
                        whiteSpace: 'collapse',
                      }}
                    >
                      Juniper & Penelope's Birthday Portal
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'primary.main',
                      boxShadow: 4,
                      cursor: isStrangerTheme ? 'pointer' : 'default',
                      flexShrink: 0
                    }}
                    onClick={handleCakeClick}
                    title={isStrangerTheme ? 'A little secret lives here' : undefined}
                  >
                    <Cake size={22} />
                  </Box>
                </Stack>
              </Stack>

              <Box
                sx={{
                  width: { xs: '100%', md: 'auto' },
                  minWidth: 0,
                  display: 'flex',
                  justifyContent: { md: 'flex-end' }
                }}
              >
                <Tabs
                  value={currentTab}
                  variant="scrollable"
                  scrollButtons={false}
                  sx={{
                    width: { xs: '100%', md: 'auto' },
                    maxWidth: '100%',
                    '.MuiTabs-indicator': { height: 3, borderRadius: 999 }
                  }}
                >
                  <Tab label="Home" value="/" component={RouterLink} to="/" />
                  <Tab label="2026" value="/event" component={RouterLink} to={currentEventPath} />
                  <Tab label="Countdown" value="/countdown" component={RouterLink} to="/countdown" />
                  <Tab label="Events" value="/events" component={RouterLink} to="/events" />
                  <Tab label="Easter Eggs" value="/easter-eggs" component={RouterLink} to="/easter-eggs" />
                </Tabs>
              </Box>
            </Stack>
          </Container>
        </AppBar>

        <Container maxWidth="xl" sx={{ pt: { xs: 3, md: 5 } }}>
          {children}
        </Container>
      </Box>
      {isUpsideDown ? (
        <Box
          sx={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: 1400,
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            bgcolor: alpha('#000', 0.62),
            border: `1px solid ${alpha('#fff', 0.2)}`
          }}
        >
          <Typography variant="caption">Upside Down opened</Typography>
        </Box>
      ) : null}
      <Dialog open={showDemogorgon} onClose={() => setShowDemogorgon(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Demogorgon Alert</DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={0.5}>
            <Typography color="text.secondary">
              You found the hidden portal trigger. Keep the Eggos close.
            </Typography>
            <Box
              component="video"
              src="/images/demogorgon.mp4"
              autoPlay
              controls
              playsInline
              sx={{
                width: '100%',
                borderRadius: 2,
                border: `1px solid ${alpha('#fff', 0.12)}`,
                backgroundColor: '#000'
              }}
            />
            <Button onClick={() => setShowDemogorgon(false)} variant="contained">
              Close Portal
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
