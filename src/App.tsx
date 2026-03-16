import { Suspense, lazy, useMemo } from 'react';
import { Box, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedEventRoute from './components/ProtectedEventRoute';
import { getCurrentEventConfig, getEventBySlug, getEventByYear } from './data/eventHelpers';
import { buildPartyTheme } from './theme/buildTheme';

const HomePage = lazy(() => import('./pages/HomePage'));
const EventPage = lazy(() => import('./pages/EventPage'));
const CountdownPage = lazy(() => import('./pages/CountdownPage'));
const PastEventsPage = lazy(() => import('./pages/PastEventsPage'));
const EasterEggsPage = lazy(() => import('./pages/EasterEggsPage'));

function RouteFallback() {
  return (
    <Box
      sx={{
        minHeight: '40vh',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}

function EventSlugRoute() {
  const { slug } = useParams();
  if (!slug) {
    return <Navigate to="/events" replace />;
  }

  const year = Number(slug);
  const event = Number.isInteger(year) ? getEventByYear(year) : getEventBySlug(slug);
  if (!event) {
    return <Navigate to="/events" replace />;
  }

  return (
    <ProtectedEventRoute year={event.year} eventName={event.event.eventName}>
      <EventPage currentEvent={event} />
    </ProtectedEventRoute>
  );
}

export default function App() {
  const location = useLocation();
  const currentEvent = getCurrentEventConfig();
  const activeEvent = useMemo(() => {
    const match = location.pathname.match(/^\/event\/([^/]+)$/);
    if (!match) return currentEvent;

    const slugOrYear = decodeURIComponent(match[1]);
    const year = Number(slugOrYear);
    if (Number.isInteger(year)) {
      return getEventByYear(year) ?? currentEvent;
    }

    return getEventBySlug(slugOrYear) ?? currentEvent;
  }, [location.pathname, currentEvent]);
  const theme = useMemo(() => buildPartyTheme(activeEvent), [activeEvent]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout currentEvent={activeEvent} pathname={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage currentEvent={currentEvent} />} />
            <Route path="/countdown" element={<CountdownPage currentEvent={currentEvent} />} />
            <Route path="/events" element={<PastEventsPage />} />
            <Route path="/easter-eggs" element={<EasterEggsPage />} />
            <Route path="/past-events" element={<Navigate to="/events" replace />} />
            <Route path="/event/:slug" element={<EventSlugRoute />} />
            <Route
              path="/event"
              element={
                <ProtectedEventRoute year={currentEvent.year} eventName={currentEvent.event.eventName}>
                  <EventPage currentEvent={currentEvent} />
                </ProtectedEventRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </ThemeProvider>
  );
}
