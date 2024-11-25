import React, { useEffect, useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import api from '../../infraestructure/api/api';

const CategoryMultiSelect = ({ onChange, value }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('/categories'); // Ajuste conforme necessário
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Categorias</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryMultiSelect;
