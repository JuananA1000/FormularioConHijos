import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Stack, Dialog, DialogTitle, DialogActions } from '@mui/material';

export const Contents = () => {
  const [lista, setLista] = useState([]);
  const [pasoBorrado, setPasoBorrado] = useState(0);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('listaContenidos')) || [];
    setLista(datosGuardados);
  }, []);

  const borrarTodo = () => {
    localStorage.removeItem('listaContenidos');
    setLista([]);
    setPasoBorrado(0);
    console.log('%cBiblioteca purgada', 'background-color: #d32f2f; color: white; padding: 5px;');
  };

  const cancelarBorrado = () => setPasoBorrado(0);

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant='h4' gutterBottom align='center'>
        Mi Biblioteca
      </Typography>

      {/* Confirmación 1 */}
      <Dialog open={pasoBorrado === 1} onClose={cancelarBorrado}>
        <DialogTitle>¿Seguro que quieres borrar?</DialogTitle>
        <DialogActions>
          <Button onClick={cancelarBorrado}>No</Button>
          <Button onClick={() => setPasoBorrado(2)} color='error' variant='contained'>
            Sí
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmación 2 (La Broma) */}
      <Dialog open={pasoBorrado === 2} onClose={cancelarBorrado}>
        <DialogTitle>¿Seguro, seguro?</DialogTitle>
        <DialogActions>
          <Button onClick={cancelarBorrado}>No, no</Button>
          <Button onClick={borrarTodo} color='error' variant='contained'>
            QUE SÍ, COJONES
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- LISTADO DE CONTENIDOS --- */}
      <Stack spacing={2}>
        {lista.map((item) => (
          <Paper key={item.id} elevation={2} sx={{ p: 3, borderLeft: '5px solid #288f09' }}>
            <Typography variant='h6'>{item.titulo}</Typography>
            <Typography variant='caption' sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
              TIPO: {item.tipoDeContenido.toUpperCase()}
            </Typography>
            {/* ... resto de campos (url, texto, etc) ... */}
          </Paper>
        ))}
      </Stack>

      {lista.length > 0 && (
        <Button variant='outlined' color='error' fullWidth onClick={() => setPasoBorrado(1)} sx={{ mb: 3 }}>
          Borrar todo el contenido
        </Button>
      )}
    </Box>
  );
};
