import { useState } from 'react';
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePasswordGate } from '../context/PasswordGateContext';
import type { EventConfig } from '../types/event';

export default function PasswordGatePage({ currentEvent }: { currentEvent: EventConfig }) {
  const navigate = useNavigate();
  const { unlockYear } = usePasswordGate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const ok = unlockYear(currentEvent.year, password);
    if (!ok) {
      setError("That password did not match this year's invitation.");
      return;
    }
    setError('');
    navigate('/event');
  };

  return (
    <Paper sx={{ maxWidth: 640, mx: 'auto', p: { xs: 3, md: 6 }, textAlign: 'center' }}>
      <Stack spacing={3}>
        <Typography variant="h2">Enter Password</Typography>
        <Typography color="text.secondary">
          Use the invitation password to unlock the event page.
        </Typography>
        <TextField
          fullWidth
          type="password"
          label="Invitation Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Button fullWidth size="large" variant="contained" onClick={handleSubmit}>
          Unlock Invite
        </Button>
      </Stack>
    </Paper>
  );
}
