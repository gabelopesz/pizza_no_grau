import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import CategoryMultiSelect from './CategoryMultiSelect';
import ImageUploader from './ImageUploader';

const AddEditProductForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    description: initialData.description || '',
    categoryId: initialData.categoryId || [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (image) => {
    setFormData((prev) => ({ ...prev, image }));
  };

  const handleCategoryChange = (selectedCategories) => {
    setFormData((prev) => ({ ...prev, categoryId: selectedCategories }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4">{isEdit ? 'Editar Produto' : 'Adicionar Produto'}</Typography>
      <TextField fullWidth label="Nome" name="name" value={formData.name} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Preço" name="price" type="number" value={formData.price} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Descrição" name="description" value={formData.description} onChange={handleChange} margin="normal" />
      <CategoryMultiSelect onChange={handleCategoryChange} value={formData.categoryId} />
      <ImageUploader onUpload={handleImageUpload} />
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        {isEdit ? 'Salvar Alterações' : 'Adicionar Produto'}
      </Button>
    </Box>
  );
};

export default AddEditProductForm;
