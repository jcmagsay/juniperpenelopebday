import { useState } from 'react';
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { usePasswordGate } from '../context/PasswordGateContext';

type Props = {
  year: number;
  eventName?: string;
  children: React.ReactNode;
};

export default function ProtectedEventRoute({ year, eventName, children }: Props) {
  const { isUnlocked, unlockYear } = usePasswordGate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = () => {
    const ok = unlockYear(year, password);
    if (!ok) {
      setError('That password did not match this invitation.');
      return;
    }

    setError('');
    setPassword('');
  };

  if (!isUnlocked(year)) {
    return (
      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Stack spacing={3}>
          <Typography variant="h4">This invitation is locked</Typography>
          {eventName ? (
            <Typography variant="h6">{eventName}</Typography>
          ) : null}
          <Typography color="text.secondary">Event year: {year}</Typography>
          <Typography color="text.secondary">
            Enter the invitation password to view event details.
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="Invitation Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUnlock();
            }}
          />
          {error ? <Alert severity="error">{error}</Alert> : null}
          <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleUnlock}>
            Unlock Invite
          </Button>
        </Stack>
      </Paper>
    );
  }

  return <>{children}</>;
}
