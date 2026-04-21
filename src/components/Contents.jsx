import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

export const Contents = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Recuperamos el string y lo parseamos
    const savedData = localStorage.getItem('ultimoContenido');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  if (!data) {
    return <Typography sx={{ p: 4 }}>No hay contenido guardado.</Typography>;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 500, margin: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant='h4' gutterBottom color='primary'>
          Contenido Recibido
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant='subtitle1'>
          <strong>Título:</strong> {data.titulo}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Autor:</strong> {data.autor}
        </Typography>
        <Typography variant='subtitle1'>
          <strong>Tipo:</strong> {data.tipoDeContenido.toUpperCase()}
        </Typography>

        <Box sx={{ mt: 2, p: 2, bgcolor: '#e0e0e0', borderRadius: 1 }}>
          {data.tipoDeContenido === 'video' && (
            <Typography>
              <strong>URL Video:</strong> {data.videoUrl}
            </Typography>
          )}
          {data.tipoDeContenido === 'audio' && (
            <Typography>
              <strong>URL Audio:</strong> {data.audioUrl}
            </Typography>
          )}
          {data.tipoDeContenido === 'texto' && (
            <Typography>
              <strong>Texto:</strong> {data.texto}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
