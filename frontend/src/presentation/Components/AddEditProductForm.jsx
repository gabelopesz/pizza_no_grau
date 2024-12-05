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
    image: initialData.image || null, // Armazena a imagem selecionada
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
      
      {/* Campo de nome do produto */}
      <TextField
        fullWidth
        label="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
      />
      
      {/* Campo de preço */}
      <TextField
        fullWidth
        label="Preço"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        margin="normal"
      />
      
      {/* Campo de descrição */}
      <TextField
        fullWidth
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
      />
      
      {/* Componente para selecionar as categorias */}
      <CategoryMultiSelect onChange={handleCategoryChange} value={formData.categoryId} />
      
      {/* Componente de upload de imagem */}
      <ImageUploader onUpload={handleImageUpload} />

      {/* Exibe o nome da imagem, caso exista */}
      {formData.image && (
        <Box sx={{ marginTop: '8px' }}>
          <Typography variant="body2" sx={{ color: 'gray' }}>
            {formData.image.name} {/* Exibe apenas o nome da imagem */}
          </Typography>
        </Box>
      )}
      
      {/* Botão para enviar o formulário */}
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        {isEdit ? 'Salvar Alterações' : 'Adicionar Produto'}
      </Button>
    </Box>
  );
};

export default AddEditProductForm;
