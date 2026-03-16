import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

const portalPulse = keyframes`
  0% { transform: scale(0.92); opacity: 0.65; filter: blur(2px); }
  50% { transform: scale(1.04); opacity: 1; filter: blur(0px); }
  100% { transform: scale(0.92); opacity: 0.65; filter: blur(2px); }
`;

const ringSpin = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(360deg) scale(1); }
`;

const floatY = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export function getCountdownParts(targetDate: string) {
  const diff = Math.max(new Date(targetDate).getTime() - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff <= 0
  };
}

export default function PortalCountdown({
  targetDate,
  title,
  showStrangerEgg = false
}: {
  targetDate: string;
  title?: string;
  showStrangerEgg?: boolean;
}) {
  const theme = useTheme();
  const [parts, setParts] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => setParts(getCountdownParts(targetDate)), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  const cards = [
    { label: 'Days', value: parts.days },
    { label: 'Hours', value: parts.hours },
    { label: 'Minutes', value: parts.minutes },
    { label: 'Seconds', value: parts.seconds }
  ];
  const showEggoSignal = showStrangerEgg && parts.days === 11 && !parts.done;

  return (
    <Stack spacing={3} alignItems="center">
      <Box sx={{ position: 'relative', width: 260, height: 260, display: 'grid', placeItems: 'center' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.45)} 0%, ${alpha(theme.palette.secondary.main, 0.4)} 40%, transparent 70%)`,
            animation: `${portalPulse} 2.8s ease-in-out infinite`
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            border: `2px dashed ${alpha(theme.palette.warning.main, 0.55)}`,
            animation: `${ringSpin} 14s linear infinite`
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 28,
            borderRadius: '50%',
            border: `2px solid ${alpha(theme.palette.primary.main, 0.55)}`,
            animation: `${ringSpin} 10s linear infinite reverse`
          }}
        />
        <Stack spacing={0.5} alignItems="center" sx={{ zIndex: 2, textAlign: 'center' }}>
          <Typography variant="overline" sx={{ letterSpacing: 3 }}>Portal opens in</Typography>
          <Typography variant="h2">{parts.days}</Typography>
          <Typography color="text.secondary">days</Typography>
        </Stack>
      </Box>

      {title ? <Typography variant="h4" textAlign="center">{title}</Typography> : null}
      {showEggoSignal ? (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          sx={{
            width: '100%',
            maxWidth: 420,
            px: 2,
            py: 1.5,
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.42)}`,
            bgcolor: alpha(theme.palette.warning.main, 0.12),
            boxShadow: `0 18px 40px ${alpha('#000', 0.28)}`
          }}
        >
          <Box
            component="img"
            src="/images/eggos.webp"
            alt="Emergency Eggo stash"
            sx={{
              width: { xs: 120, sm: 104 },
              height: 'auto',
              borderRadius: 2,
              border: `1px solid ${alpha('#fff', 0.16)}`,
              transform: 'rotate(-6deg)',
              boxShadow: `0 14px 30px ${alpha('#000', 0.32)}`
            }}
          />
          <Stack spacing={0.25} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: 'warning.light' }}>
              Hawkins Supply Drop
            </Typography>
            <Typography variant="body1">11 days to go. Emergency Eggos unlocked.</Typography>
            <Typography variant="body2" color="text.secondary">
              Eleven would approve this countdown milestone.
            </Typography>
          </Stack>
        </Stack>
      ) : null}

      <Grid container spacing={2} sx={{ width: '100%' }}>
        {cards.map((card) => (
          <Grid key={card.label} size={{ xs: 6, md: 3 }}>
            <Card sx={{ textAlign: 'center', animation: `${floatY} 4s ease-in-out infinite` }}>
              <CardContent>
                <Typography variant="h3">{card.value}</Typography>
                <Typography color="text.secondary">{card.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
