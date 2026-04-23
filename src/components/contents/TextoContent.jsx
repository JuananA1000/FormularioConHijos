import { Box, Typography } from '@mui/material';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export const TextoContent = ({ formik }) => {
  return (
    <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant='h5'>Información del Texto</Typography>

      <Box
        sx={{
          '& .ql-container': {
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
            minHeight: '200px',
            fontSize: '1rem',
          },
          '& .ql-toolbar': {
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '4px',
            backgroundColor: '#f3f3f3',
          },
        }}>
        <ReactQuill
          theme='snow'
          value={formik.values.texto}
          onChange={(content) => formik.setFieldValue('texto', content)}
          placeholder='Escribe...'
        />
      </Box>
    </Box>
  );
};
