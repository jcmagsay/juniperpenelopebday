import { List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';

export default function EasterEggsPage() {
  return (
    <Stack spacing={3}>
      <Typography variant="h3">Easter Eggs</Typography>
      <Paper sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText
              primary="Konami Code: Open the Upside Down"
              secondary="Enter Up, Up, Down, Down, Left, Right, Left, Right, B, A on your keyboard."
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Secret Demogorgon Popup"
              secondary="Click the cake icon in the top bar five times quickly."
            />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText
              primary="Eggo Countdown Signal"
              secondary="When countdown reaches exactly 11 days, an Eggo callout appears."
            />
          </ListItem>
        </List>
      </Paper>
    </Stack>
  );
}
