import { List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';

export default function EventDetailsSection({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <Paper sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1.25} alignItems="center" mb={1.5}>
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Stack>
      <List dense disablePadding>
        {items.map((item) => (
          <ListItem key={item} disableGutters sx={{ py: 0.4 }}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
