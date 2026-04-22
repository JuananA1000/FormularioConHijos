import React from 'react';
import { Stack, Paper, Box, Typography, CardMedia } from '@mui/material';

export const ContentsList = ({ lista }) => {
  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      {lista.map((item) => {
        const videoId = item.tipoDeContenido === 'video' ? getYouTubeID(item.videoUrl) : null;

        const thumbnail =
          item.tipoDeContenido === 'video' && videoId
            ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` 
            : item.tipoDeContenido === 'audio'
              ? 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop'
              : null;

        return (
          <Paper
            key={item.id}
            elevation={2}
            sx={{
              p: 3,
              borderLeft: '5px solid #288f09',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}>
            {thumbnail && (
              <CardMedia
                component='img'
                sx={{ width: 100, height: 100, borderRadius: 1, objectFit: 'cover' }}
                image={thumbnail}
                alt='miniatura'
                // Imagen de respaldo por si falla la carga
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100?text=Video';
                }}
              />
            )}

            <Box sx={{ flex: 1 }}>
              <Typography variant='h6'>{item.titulo}</Typography>

              {item.tipoDeContenido === 'video' && (
                <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary' }}>
                  🎥 URL del video: {item.videoUrl}
                </Typography>
              )}

              {item.tipoDeContenido === 'audio' && (
                <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary' }}>
                  🎧 URL del audio: {item.audioUrl}
                </Typography>
              )}

              {item.tipoDeContenido === 'texto' && (
                <Typography variant='body2' sx={{ mb: 1, fontStyle: 'italic' }}>
                  📄 {item.texto.substring(0, 60)}...
                </Typography>
              )}

              <Typography variant='caption' sx={{ display: 'block', fontWeight: 'bold', color: '#288f09' }}>
                TIPO: {item.tipoDeContenido.toUpperCase()}
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </Stack>
  );
};
