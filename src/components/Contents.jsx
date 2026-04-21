import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider, Stack, Button } from '@mui/material';

export const Contents = () => {
  const [lista, setLista] = useState([]);

  // const borrarTODO = () => {
  //   localStorage.removeItem('listaContenidos');
  //   setLista([]);
  // };

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('listaContenidos')) || [];
    setLista(datosGuardados);
  }, []);

  if (lista.length === 0) {
    return <Typography sx={{ p: 4 }}>No hay contenidos guardados todavía.</Typography>;
  }

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant='h4' gutterBottom align='center'>
        Mi Biblioteca de Contenidos
      </Typography>

      <Stack spacing={2}>
        {lista.map((item) => (
          <Paper key={item.id} elevation={2} sx={{ p: 3, borderLeft: '5px solid #288f09' }}>
            <Typography variant='h6'>{item.titulo}</Typography>
            <Typography variant='body2' color='textSecondary'>
              Por: {item.autor}
            </Typography>
            <Typography variant='caption' sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
              TIPO: {item.tipoDeContenido.toUpperCase()}
            </Typography>

            <Divider sx={{ my: 1 }} />

            {item.tipoDeContenido === 'video' && (
              <Typography variant='body2'>
                🎥 <b>URL Video:</b> {item.videoUrl}
              </Typography>
            )}
            {item.tipoDeContenido === 'audio' && (
              <Typography variant='body2'>
                🎧 <b>URL Audio:</b> {item.audioUrl}
              </Typography>
            )}
            {item.tipoDeContenido === 'texto' && (
              <Typography variant='body2'>
                📄 <b>Contenido:</b> {item.texto}
              </Typography>
            )}
          </Paper>
        ))}
      </Stack>

      {/* <Button onClick={() => borrarTODO()} color='error' variant='contained' fullWidth sx={{ mt: 4 }}>
        Borrar todo el contenido de la biblioteca
      </Button> */}
    </Box>
  );
};
