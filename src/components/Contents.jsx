import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { ContentsList } from './ContentsList';

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
      <ContentsList lista={lista} />

      {/* Botón de borrado al final */}
      {lista.length > 0 && (
        <Button variant='outlined' color='error' fullWidth onClick={() => setPasoBorrado(1)}>
          Borrar todo el contenido
        </Button>
      )}
    </Box>
  );
};
