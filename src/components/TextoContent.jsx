import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

export const TextoContent = ({ formik }) => {
  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant='h5'>Información del Texto</Typography>
      <TextField
        fullWidth
        id='texto'
        name='texto'
        label='Contenido del Texto'
        value={formik.values.texto}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.texto && Boolean(formik.errors.texto)}
        helperText={formik.touched.texto && formik.errors.texto}
      />
    </Box>
  );
};
