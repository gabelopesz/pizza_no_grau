import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editCategory } from "../../application/useCases/category/editCategory.js";
import { getCategory } from "../../application/useCases/category/getCategory.js";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    // Buscar os detalhes da categoria pelo ID
    const fetchCategory = async () => {
      try {
        const category = await getCategory(id); // Use case para buscar a categoria
        setFormData({ name: category.name });
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        alert("Erro ao carregar os dados da categoria.");
        navigate("/categories"); // Redirecionar em caso de erro
      }
    };
    fetchCategory();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editCategory(id, formData);
      alert("Categoria atualizada com sucesso!");
      navigate("/categories");
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
      alert("Erro ao editar categoria.");
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

export default EditCategory;
