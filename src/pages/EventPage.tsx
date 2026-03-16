import { useMemo, useState } from 'react';
import { Box, Button, Chip, Collapse, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { CalendarDays, CalendarPlus, Clock3, MapPin, Popcorn, Sparkles, Ticket } from 'lucide-react';
import EventDetailsSection from '../components/EventDetailsSection';
import PostcardInvite from '../components/PostcardInvite';
import RSVPEmbed from '../components/RSVPEmbed';
import { downloadCalendarInvite, isValidGoogleFormEmbed } from '../data/eventHelpers';
import type { EventConfig } from '../types/event';

export default function EventPage({ currentEvent }: { currentEvent: EventConfig }) {
  const [bottomRsvpOpen, setBottomRsvpOpen] = useState(false);
  const { event } = currentEvent;
  const hasAddress = Boolean(event.address.trim());
  const hasContactEmail = Boolean(event.rsvp.contactEmail.trim());
  const hasContactPhone = Boolean(event.rsvp.contactPhone.trim());
  const mapQuery = event.address;
  const mapSearchUrl = hasAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}` : undefined;
  const canEmbedBottomRsvp = useMemo(
    () => event.rsvp.enabled && event.rsvp.mode === 'embed' && isValidGoogleFormEmbed(event.rsvp.embedUrl),
    [event.rsvp]
  );
  const handleCalendarDownload = () => downloadCalendarInvite(currentEvent);

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Typography variant="h3">{event.eventName}</Typography>
      </Paper>

      <RSVPEmbed currentEvent={currentEvent} handleCalendarDownload={handleCalendarDownload} />

      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 6 }}>
          <PostcardInvite image={currentEvent.postcardImage} alt={`${event.eventName} postcard invitation`} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: { xs: 3, md: 4 }, maxHeight: { lg: 740 }, overflowY: 'auto' }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Chip label={`${currentEvent.year} invitation`} sx={{ width: 'fit-content' }} />
                <Typography variant="h3">{event.eventName}</Typography>
                {event.description.map((item, idx) => (
                  <Typography color="text.secondary">{item}</Typography>
                ))}
              </Stack>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Paper sx={{ p: 2.25 }}>
                    <Stack direction="row" spacing={1.25} alignItems="center" mb={1}>
                      <CalendarDays size={18} />
                      <Typography variant="subtitle1" fontWeight={700}>Date</Typography>
                    </Stack>
                    <Typography>
                      {new Date(event.date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </Typography>

                    <Stack direction="row" spacing={1.25} alignItems="center" mt={4} mb={1}>
                      <Clock3 size={18} />
                      <Typography variant="subtitle1" fontWeight={700}>Time</Typography>
                    </Stack>
                    <Typography>
                      {new Date(event.date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} -{' '}
                      {new Date(event.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </Typography>

                    <Stack direction="row" spacing={1.25} alignItems="center" mt={4} mb={1}>
                      <MapPin size={18} />
                      <Typography variant="subtitle1" fontWeight={700}>Location</Typography>
                    </Stack>
                    <Typography sx={{ py: 2.25 }} variant="subtitle1">{event.location}</Typography>
                    <Typography sx={{ pt: 1.25 }} color="text.secondary">
                      {hasAddress ? event.address : 'Address available after RSVP.'}
                    </Typography>
                    <Stack direction={{ xs: 'column' }} spacing={1.25} sx={{ mt: 2 }}>
                      {mapSearchUrl ? (
                        <>
                          <Link href={mapSearchUrl} target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-block' }}>
                            Open in Maps
                          </Link>
                          <Divider />
                        </>
                      ) : null}
                      <Button
                        variant="text"
                        onClick={handleCalendarDownload}
                        startIcon={<CalendarPlus size={16} />}
                        sx={{ width: 'fit-content', px: 0 }}
                      >
                        Add to Calendar
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>

              <Divider />

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <EventDetailsSection title="Menu" items={event.menu} icon={<Popcorn size={18} />} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <EventDetailsSection title="Beverages" items={event.beverages} icon={<Sparkles size={18} />} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <EventDetailsSection title="Activities" items={event.activities} icon={<Ticket size={18} />} />
                </Grid>
              </Grid>

              <Paper sx={{ p: 2.5 }}>
                <Typography variant="h6" gutterBottom>
                  Notes
                </Typography>
                <Stack spacing={1}>
                  {event.notes.map((note) => (
                    <Typography key={note} color="text.secondary">• {note}</Typography>
                  ))}
                </Stack>
              </Paper>

              <Paper sx={{ p: 2.5 }}>
                <Typography variant="h6" gutterBottom>
                  Contact
                </Typography>
                <Typography>{event.rsvp.contactName}</Typography>
                {hasContactEmail ? <Typography color="text.secondary">{event.rsvp.contactEmail}</Typography> : null}
                {hasContactPhone ? <Typography color="text.secondary">{event.rsvp.contactPhone}</Typography> : null}
                {!hasContactEmail && !hasContactPhone ? (
                  <Typography color="text.secondary">Contact details available after RSVP.</Typography>
                ) : null}
              </Paper>

              {event.rsvp.enabled ? (
                <Paper sx={{ p: 2.5 }}>
                  <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                      <Box>
                        <Typography variant="h6">RSVP HERE!</Typography>
                      </Box>
                      <Button variant="contained" onClick={() => setBottomRsvpOpen((prev) => !prev)}>
                        {bottomRsvpOpen ? 'Hide Form' : (event.rsvp.buttonLabel ?? 'RSVP Now')}
                      </Button>
                    </Stack>

                    <Collapse in={bottomRsvpOpen} timeout="auto" unmountOnExit>
                      {canEmbedBottomRsvp ? (
                        <Box
                          sx={{
                            mt: 1,
                            borderRadius: 3,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.08)',
                            minHeight: 880,
                            bgcolor: 'rgba(255,255,255,0.02)'
                          }}
                        >
                          <Box
                            component="iframe"
                            src={event.rsvp.embedUrl}
                            title={`${event.eventName} RSVP form (details section)`}
                            sx={{ width: '100%', minHeight: 880, border: 0, backgroundColor: '#fff' }}
                          />
                        </Box>
                      ) : (
                        <Paper sx={{ p: 2, mt: 1 }}>
                          <Typography variant="body1" gutterBottom>
                            Add your Google Form embed URL in <strong>src/data/events.json</strong>.
                          </Typography>
                          <Typography color="text.secondary">
                            Use the Google Forms embed link format ending with <strong>embedded=true</strong>.
                          </Typography>
                        </Paper>
                      )}

                      <Button
                        variant="text"
                        onClick={handleCalendarDownload}
                        startIcon={<CalendarPlus size={16} />}
                        sx={{
                          display: 'flex',
                          justifySelf: 'center',
                          width: 'fit-content',
                          my: 4,
                          px: 0,
                        }}
                      >
                        Add to Calendar
                      </Button>
                    </Collapse>
                  </Stack>
                </Paper>
              ) : null}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
