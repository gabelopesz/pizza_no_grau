import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editCategory } from "../../application/useCases/category/editCategory.js";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    // Simular busca de categoria por ID
    const fetchCategory = async () => {
      // Substituir pela lógica real de busca no backend
      setName("Categoria");
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCategory(id, { name });
      alert("Categoria atualizada com sucesso!");
      navigate("/categories");
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      alert("Erro ao atualizar categoria.");
    }
  };

  return (
    <Box component={Paper} sx={{ padding: 4, maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        Editar Categoria
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

export default EditCategory;
