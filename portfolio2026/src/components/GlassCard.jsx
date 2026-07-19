import { Box } from '@mui/material';

export default function GlassCard({ children, sx = {} }) {
  return (
    <Box
      sx={(theme) => ({
        // Base aesthetic
        background: theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(16px)', // Softer base blur
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px',
        p: 4,
        
        // Subtle, sophisticated transition
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        
        // Hover: Focus on lighting, not movement
        '&:hover': {
          background: theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(24px)', // Gentle blur increase
          borderColor: 'rgba(255,255,255,0.3)', // Subtle edge highlight
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)', // Soft depth shift
        },
        ...sx
      })}
    >
      {children}
    </Box>
  );
}