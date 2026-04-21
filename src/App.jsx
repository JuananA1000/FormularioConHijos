import React from 'react';
import { useFormik } from 'formik';

import { VideoContent } from './components/VideoContent';
import { AudioContent } from './components/AudioContent';
import { TextoContent } from './components/TextoContent';

import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

import './App.css';

const App = () => {
  const formik = useFormik({
    initialValues: {
      tipoDeContenido: '',
      titulo: '',
      apellidos: '',
      terminos: false,
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
          id='tipoDeContenido'
          name='tipoDeContenido'
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
          // sx={{ opacity: 0.5 }}
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

        {formik.values.tipoDeContenido === 'video' && <VideoContent formik={formik} />}
        {formik.values.tipoDeContenido === 'audio' && <AudioContent formik={formik} />}
        {formik.values.tipoDeContenido === 'texto' && <TextoContent formik={formik} />}

        <Button color='primary' variant='contained' fullWidth type='submit'>
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default App;
