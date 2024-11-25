import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../../application/useCases/category/addCategory";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const AddCategory = () => {
  const [name, setName] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("O campo 'Nome' é obrigatório.");
      return;
    }

    try {
      await addCategory({ name });
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
