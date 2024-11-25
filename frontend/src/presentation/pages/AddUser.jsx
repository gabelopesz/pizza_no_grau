import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../application/useCases/user/addUser';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.email.trim() && formData.password.trim()) {
      await addUser(formData);
      navigate('/');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '400px', margin: '0 auto' }} component={Paper}>
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Adicionar Usuário
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Nome" name="name" value={formData.name} onChange={handleChange} />
        <TextField fullWidth label="E-mail" name="email" value={formData.email} onChange={handleChange} />
        <TextField
          fullWidth
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Salvar
        </Button>
      </form>
    </Box>
  );
};

export default AddUser;
