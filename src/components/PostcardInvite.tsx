import { Box, Paper } from '@mui/material';

export default function PostcardInvite({ image, alt }: { image: string; alt: string }) {
  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
      }}
    >
      <Box
        component="img"
        src={image}
        alt={alt}
        sx={{
          width: '100%',
          maxHeight: { xs: 420, lg: 720 },
          objectFit: 'cover',
          objectPosition: 'top',
          borderRadius: 4,
          boxShadow: 10,
          border: '8px solid rgba(255,255,255,0.08)'
        }}
      />
    </Paper>
  );
}
