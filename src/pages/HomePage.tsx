import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PortalCountdown from '../components/PortalCountdown';
import { getPastEvents } from '../data/eventHelpers';
import type { EventConfig } from '../types/event';

export default function HomePage({ currentEvent }: { currentEvent: EventConfig }) {
  const pastEvents = getPastEvents().slice(0, 3);

  return (
    <Stack spacing={4}>
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          backgroundImage: 'url(/images/stranger-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom'
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Stack spacing={2.5}>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.8rem', md: '4.6rem' }, lineHeight: 0.95 }}>
                {currentEvent.event.eventName}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, fontWeight: 400 }}>
                Join us for some upside down fun, food, and games.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button component={RouterLink} to={`/event/${currentEvent.slug}`} variant="contained" size="large">
                  View Invite
                </Button>
                <Button component={RouterLink} to="/countdown" variant="outlined" size="large">
                  Open Countdown
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <PortalCountdown
              targetDate={currentEvent.event.date}
              title={`Twins turning ${currentEvent.event.ageTurning}`}
              showStrangerEgg={currentEvent.themeKey === 'stranger-things'}
            />
          </Grid>
        </Grid>
      </Paper>

      <Stack spacing={2}>
        <Typography variant="h4">Past Parties</Typography>
        <Grid container spacing={3}>
          {pastEvents.map((item) => (
            <Grid key={item.year} size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2.5, height: '100%' }}>
                <Stack spacing={1.25}>
                  <Typography variant="h5">{item.year}</Typography>
                  <Typography variant="subtitle1">{item.event.eventName}</Typography>
                  <Typography color="text.secondary">{Array.isArray(item.event.description) ? item.event.description[0] : item.event.description}</Typography>
                  <Button component={RouterLink} to={`/event/${item.slug}`} variant="text" sx={{ width: 'fit-content', px: 0 }}>
                    View event details
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
