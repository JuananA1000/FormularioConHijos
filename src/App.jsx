import React from 'react';
import { useFormik } from 'formik';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
  FormHelperText,
  MenuItem,
} from '@mui/material';

import './App.css';

const App = () => {
  const formik = useFormik({
    initialValues: {
      tipoDeContenido: '',
      nombre: '',
      apellidos: '',
      terminos: false,
    },
    validate: (values) => {
      const errors = {};
      if (!values.nombre) errors.nombre = 'El nombre es obligatorio';
      if (!values.apellidos) errors.apellidos = 'Los apellidos son obligatorios';
      if (!values.terminos) errors.terminos = 'Debes aceptar los términos';
      return errors;
    },
    onSubmit: (values) => {
      console.log('Datos enviados:', values);
      alert('Formulario enviado con éxito');
    },
  });

  // Opciones para el select
  const tiposDeContenido = [
    { value: 'video', label: 'Vídeo' },
    { value: 'audio', label: 'Audio' },
    { value: 'texto', label: 'Texto' },
  ];

  return (
    <div className='app'>
      <h1>Formulario de Contenido</h1>
      <form>
        <TextField
          fullWidth
          select // Esta propiedad convierte el TextField en un Select
          id='plan'
          name='plan'
          label='Selecciona el tipo de contenido'
          value={formik.values.tipoDeContenido}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tipoDeContenido && Boolean(formik.errors.tipoDeContenido)}
          helperText={formik.touched.tipoDeContenido && formik.errors.tipoDeContenido}>
          {tiposDeContenido.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          id='titulo'
          name='titulo'
          label='Título'
          value={formik.values.titulo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} // Ayuda a saber si el usuario tocó el campo
          error={formik.touched.titulo && Boolean(formik.errors.titulo)}
          helperText={formik.touched.titulo && formik.errors.titulo}
          disabled={!formik.values.tipoDeContenido}
          />

        <TextField
          fullWidth
          id='autor'
          name='autor'
          label='Autor'
          value={formik.values.autor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.autor && Boolean(formik.errors.autor)}
          helperText={formik.touched.autor && formik.errors.autor}
          disabled={!formik.values.tipoDeContenido}
        />

        <Box>
          <FormControlLabel
            control={
              <Checkbox
                id='terminos'
                name='terminos'
                checked={formik.values.terminos}
                onChange={formik.handleChange}
                color='primary'
              />
            }
            label='Acepto los términos y condiciones'
          />
          {formik.touched.terminos && formik.errors.terminos && (
            <FormHelperText error>{formik.errors.terminos}</FormHelperText>
          )}
        </Box>

        <Button color='primary' variant='contained' fullWidth type='submit'>
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default App;
