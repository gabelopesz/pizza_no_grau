import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../application/useCases/category/addCategory.js";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const AddCategory = () => {
  const [formData, setFormData] = useState({ name: ""});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory(formData);
      alert("Categoria adicionada com sucesso!");
      navigate("/categories");
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      alert("Erro ao adicionar categoria.");
    }
  };

  return (
    <Box component={Paper} sx={{ padding: 4, maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        Adicionar Categoria
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
 
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Salvar
        </Button>
      </form>
    </Box>
  );
};

export default AddCategory;
