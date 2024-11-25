import React from 'react';
import { Button } from '@mui/material';

const ImageUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <Button variant="outlined" component="label">
        Upload de Imagem
        <input type="file" hidden onChange={handleFileChange} accept="image/*" />
      </Button>
    </div>
  );
};

export default ImageUploader;
