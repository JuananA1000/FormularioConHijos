import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

export const AudioContent = ({ formik }) => {
  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant='h5'>Información del Audio</Typography>
      <TextField
        fullWidth
        id='audioUrl'
        name='audioUrl'
        label='URL del Audio'
        value={formik.values.audioUrl}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.audioUrl && Boolean(formik.errors.audioUrl)}
        helperText={formik.touched.audioUrl && formik.errors.audioUrl}
      />
    </Box>
  );
};
