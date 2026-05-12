import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { ContentsList } from './ContentsList';

export const Contents = ({ onBack }) => {
  const [lista, setLista] = useState([]);
  const [pasoBorrado, setPasoBorrado] = useState(0);

  const handleBorrarTodo = () => {
    localStorage.removeItem('listaContenidos');
    setLista([]);
    setPasoBorrado(0);
  };

  const handleBorrarElemento = (listaActualizada) => setLista(listaActualizada);
  const cancelarBorrado = () => setPasoBorrado(0);

  useEffect(() => {
    const datosGuardados = JSON.parse(localStorage.getItem('listaContenidos')) || [];
    setLista(datosGuardados);
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant='h4' gutterBottom sx={{ margin: 0 }}>
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
          <Button onClick={handleBorrarTodo} color='error' variant='contained'>
            QUE SÍIIIIIIII
          </Button>
        </DialogActions>
      </Dialog>

      <ContentsList lista={lista} onDelete={handleBorrarElemento} />

      {/* Botón de borrado al final */}
      {lista.length > 0 ? (
        <Button variant='outlined' color='error' fullWidth onClick={() => setPasoBorrado(1)} sx={{ mb: 2 }}>
          Borrar todo el contenido
        </Button>
      ) : (
        <>
          <Typography variant='body1' align='center' color='text.secondary'>
            No hay contenidos guardados. Agrega algunos desde el formulario.
          </Typography>
        </>
      )}

      <Button size='small' variant='contained' color='error' fullWidth onClick={onBack} sx={{ mt: 2 }}>
        Volver
      </Button>
    </Box>
  );
};
