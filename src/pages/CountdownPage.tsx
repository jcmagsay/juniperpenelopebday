import { Paper, Stack, Typography } from '@mui/material';
import PortalCountdown from '../components/PortalCountdown';
import type { EventConfig } from '../types/event';

export default function CountdownPage({ currentEvent }: { currentEvent: EventConfig }) {
  return (
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Stack spacing={3}>
        <Typography variant="h3">Countdown</Typography>
        <Typography color="text.secondary">
          Counting down to party time.
        </Typography>
        <PortalCountdown
          targetDate={currentEvent.event.date}
          title={`${currentEvent.event.eventName} is getting close`}
          showStrangerEgg={currentEvent.themeKey === 'stranger-things'}
        />
      </Stack>
    </Paper>
  );
}
