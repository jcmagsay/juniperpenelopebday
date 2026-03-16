import { useMemo, useState } from 'react';
import { Box, Button, Collapse, Paper, Stack, Typography } from '@mui/material';
import { CalendarPlus, ChevronDown, ChevronUp } from 'lucide-react';
import type { EventConfig } from '../types/event';
import { isValidGoogleFormEmbed } from '../data/eventHelpers';

type Props = {
  currentEvent: EventConfig;
  handleCalendarDownload: () => void;
};

export default function RSVPEmbed({ currentEvent, handleCalendarDownload }: Props) {
  const [open, setOpen] = useState(false);
  const rsvp = currentEvent.event.rsvp;

  const canEmbed = useMemo(() => rsvp.enabled && rsvp.mode === 'embed' && isValidGoogleFormEmbed(rsvp.embedUrl), [rsvp]);

  if (!rsvp.enabled) return null;

  return (
    <Paper sx={{ p: 2.5 }}>
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
          <Box>
            <Typography variant="h6">RSVP</Typography>
            <Typography color="text.secondary">
              {rsvp.helperText ?? 'Open the RSVP form right inside the page.'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            endIcon={open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? 'Hide Form' : (rsvp.buttonLabel ?? 'RSVP Now')}
          </Button>
        </Stack>

        <Collapse in={open} timeout="auto" unmountOnExit>
          {canEmbed ? (
            <Box
              sx={{
                mt: 1,
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 575,
                bgcolor: 'rgba(255,255,255,0.02)'
              }}
            >
              <Box
                component="iframe"
                src={rsvp.embedUrl}
                title={`${currentEvent.event.eventName} RSVP form`}
                sx={{ width: '100%', minHeight: 575, border: 0, backgroundColor: 'transparent' }}
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
  );
}
