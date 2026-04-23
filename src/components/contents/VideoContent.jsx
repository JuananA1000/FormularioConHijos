import { TextField, Box, Typography } from '@mui/material';

export const VideoContent = ({ formik }) => {
  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant='h5'>Información del Vídeo</Typography>
      <TextField
        fullWidth
        id='videoUrl'
        name='videoUrl'
        label='URL del Vídeo'
        value={formik.values.videoUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
        helperText={formik.touched.videoUrl && formik.errors.videoUrl}
      />
    </Box>
  );
};
