import { useState, useEffect } from 'react';

import { useFormik } from 'formik';

import { VideoContent } from './components/VideoContent';
import { AudioContent } from './components/AudioContent';
import { TextoContent } from './components/TextoContent';
import { Contents } from './components/Contents';

import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

import './App.css';

const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  const goTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const formik = useFormik({
    initialValues: {
      tipoDeContenido: '',
      titulo: '',
      autor: '',

      videoUrl: '',
      audioUrl: '',
      texto: '',
    },

    onSubmit: (values) => {
      let nuevoContenido = {
        tipoDeContenido: values.tipoDeContenido,
        titulo: values.titulo,
        autor: values.autor,
      };

      if (values.tipoDeContenido === 'video') {
        nuevoContenido.videoUrl = values.videoUrl;
      } else if (values.tipoDeContenido === 'audio') {
        nuevoContenido.audioUrl = values.audioUrl;
      } else if (values.tipoDeContenido === 'texto') {
        nuevoContenido.texto = values.texto;
      }

      const contenidosPrevios = JSON.parse(localStorage.getItem('listaContenidos')) || [];
      const nuevaLista = [nuevoContenido, ...contenidosPrevios];
      localStorage.setItem('listaContenidos', JSON.stringify(nuevaLista));

      goTo('/contents');

      console.log('%cDatos a enviar:', 'background-color: #288f09;  padding: 5px; display: block;', nuevoContenido);

      formik.resetForm();
    },
  });

  const tiposDeContenido = [
    { value: 'video', label: 'Vídeo' },
    { value: 'audio', label: 'Audio' },
    { value: 'texto', label: 'Texto' },
  ];

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return (
    <div className='app'>
      {path === '/' && (
        <>
          <h1>Formulario de Contenido</h1>
          <form onSubmit={formik.handleSubmit}>
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
              sx={!formik.values.tipoDeContenido ? { opacity: 0.5 } : {}}
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
              sx={!formik.values.tipoDeContenido ? { opacity: 0.5 } : {}}
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
        </>
      )}

      {path === '/contents' && (
        <>
          <Contents />
          <Button onClick={() => goTo('/')} color='primary' variant='contained' fullWidth>
            Volver
          </Button>
        </>
      )}
    </div>
  );
};

export default App;
