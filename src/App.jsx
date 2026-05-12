import { useState, useEffect } from 'react';

import { useFormik } from 'formik';

import { VideoContent } from './components/contents/VideoContent';
import { AudioContent } from './components/contents/AudioContent';
import { TextoContent } from './components/contents/TextoContent';
import { Contents } from './components/Contents';

import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';

import * as Yup from 'yup';

import './App.css';

const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  const goTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const validacionYUP = Yup.object({
    tipoDeContenido: Yup.string().required('Selecciona un tipo de contenido'),
    titulo: Yup.string().required('El título es obligatorio'),

    videoUrl: Yup.string().when('tipoDeContenido', {
      is: 'video',
      then: (schema) => schema.required('La URL del video es obligatoria'),
    }),
    audioUrl: Yup.string().when('tipoDeContenido', {
      is: 'audio',
      then: (schema) => schema.required('La URL del audio es obligatoria'),
    }),
    texto: Yup.string().when('tipoDeContenido', {
      is: 'texto',
      then: (schema) => schema.required('El texto es obligatorio'),
    }),
  });

  const formik = useFormik({
    initialValues: {
      tipoDeContenido: '',
      titulo: '',
      autor: '',
      fechaDePublicacion: dayjs().locale('es'), // Objeto dayjs original (hoy)

      videoUrl: '',
      audioUrl: '',
      texto: '',
    },

    validationSchema: validacionYUP,

    onSubmit: (values) => {
      const camposPorTipo = {
        video: 'videoUrl',
        audio: 'audioUrl',
        texto: 'texto',
      };

      const campoExtra = camposPorTipo[values.tipoDeContenido];

      let nuevoContenido = {
        id: Date.now(),
        tipoDeContenido: values.tipoDeContenido,
        titulo: values.titulo,
        autor: values.autor,
        fechaDePublicacion: values.fechaDePublicacion ? dayjs(values.fechaDePublicacion).format('DD-MM-YYYY') : '',
        [campoExtra]: values[campoExtra],
      };

      // Eliminar campos vacíos
      nuevoContenido = Object.fromEntries(
        Object.entries(nuevoContenido).filter(([_, value]) => value !== '' && value !== null && value !== undefined),
      );

      const contenidosPrevios = JSON.parse(localStorage.getItem('listaContenidos')) || [];
      const nuevaLista = [nuevoContenido, ...contenidosPrevios];

      localStorage.setItem('listaContenidos', JSON.stringify(nuevaLista));

      goTo('/contents');
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
        <Box sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
          <h1 style={{ textAlign: 'center' }}>Formulario de Contenido</h1>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              select // Esta propiedad convierte el TextField en un Select
              sx={{ opacity: 0.5, marginBottom: '10px' }}
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
              sx={!formik.values.tipoDeContenido ? { opacity: 0.5, marginBottom: '10px' } : { marginBottom: '10px' }}
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
              sx={!formik.values.tipoDeContenido ? { opacity: 0.5, marginBottom: '10px' } : { marginBottom: '10px' }}
              label='Autor'
              value={formik.values.autor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.autor && Boolean(formik.errors.autor)}
              helperText={formik.touched.autor && formik.errors.autor}
              disabled={!formik.values.tipoDeContenido}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id='fechaDePublicacion'
                name='fechaDePublicacion'
                label='Fecha de Publicación'
                format='DD-MM-YYYY'
                value={formik.values.fechaDePublicacion}
                onChange={(newValue) => formik.setFieldValue('fechaDePublicacion', newValue)}
                sx={!formik.values.tipoDeContenido ? { opacity: 0.5, width: '100%' } : { width: '100%' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    onBlur={formik.handleBlur}
                    error={formik.touched.fechaDePublicacion && Boolean(formik.errors.fechaDePublicacion)}
                    helperText={formik.touched.fechaDePublicacion && formik.errors.fechaDePublicacion}
                    disabled={!formik.values.tipoDeContenido}
                  />
                )}
              />
            </LocalizationProvider>

            {formik.values.tipoDeContenido === 'video' && <VideoContent formik={formik} />}
            {formik.values.tipoDeContenido === 'audio' && <AudioContent formik={formik} />}
            {formik.values.tipoDeContenido === 'texto' && <TextoContent formik={formik} />}

            <Button
              color='primary'
              variant='contained'
              fullWidth
              type='submit'
              sx={{ marginTop: '10px' }}
              disabled={!formik.values.tipoDeContenido}>
              Enviar
            </Button>
          </form>

          <Button
            onClick={() => goTo('/contents')}
            color='info'
            variant='outlined'
            fullWidth
            sx={{ marginTop: '10px' }}>
            Ver Contenidos Guardados
          </Button>
        </Box>
      )}

      {path === '/contents' && <Contents onBack={() => goTo('/')} />}
    </div>
  );
};

export default App;
