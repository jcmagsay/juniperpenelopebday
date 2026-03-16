import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getPastEvents, getUpcomingEvents } from '../data/eventHelpers';

export default function PastEventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Events</Typography>

      <Stack spacing={2}>
        <Typography variant="h4">Upcoming Events</Typography>
        <Grid container spacing={3}>
          {upcomingEvents.map((item) => (
            <Grid key={item.year} size={{ xs: 12, md: 6 }}>
              <Card sx={{ overflow: 'hidden', height: '100%' }}>
                <Box component="img" src={item.postcardImage} alt={item.event.eventName} sx={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: '0 0' }} />
                <CardContent>
                  <Stack spacing={1.25}>
                    <Chip label={item.year} sx={{ width: 'fit-content' }} />
                    <Typography variant="h5">{item.event.eventName}</Typography>
                    <Typography color="text.secondary">{eventSummary(item.event.description)}</Typography>
                    <Button component={RouterLink} to={`/event/${item.slug}`} variant="text" sx={{ width: 'fit-content', px: 0 }}>
                      View event details
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h4">Past Events</Typography>
        <Grid container spacing={3}>
          {pastEvents.map((item) => (
            <Grid key={item.year} size={{ xs: 12, md: 6 }}>
              <Card sx={{ overflow: 'hidden', height: '100%' }}>
                <Box component="img" src={item.postcardImage} alt={item.event.eventName} sx={{ width: '100%', height: 220, objectFit: 'cover' }} />
                <CardContent>
                  <Stack spacing={1.25}>
                    <Chip label={item.year} sx={{ width: 'fit-content' }} />
                    <Typography variant="h5">{item.event.eventName}</Typography>
                    <Typography color="text.secondary">{eventSummary(item.event.description)}</Typography>
                    <Button component={RouterLink} to={`/event/${item.slug}`} variant="text" sx={{ width: 'fit-content', px: 0 }}>
                      View event details
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}

function eventSummary(description: string | string[]) {
  return Array.isArray(description) ? description[0] : description;
}
