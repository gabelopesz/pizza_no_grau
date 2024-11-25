import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const AddProducts = ({ onAdd, nextId }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.price.trim() && formData.stock.trim()) {
      onAdd({ ...formData, id: nextId });
      navigate("/"); // Navigate back to ProductCRUD
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: "#F9F9FA",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
      component={Paper}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{
          textAlign: "center",
          marginBottom: 3,
          color: "#80869A",
        }}
      >
        Adicionar Produto
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
        <TextField
          fullWidth
          label="Preço"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Estoque"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: "#F54749",
            "&:hover": { backgroundColor: "#D63939" },
          }}
        >
          Salvar
        </Button>
      </form>
    </Box>
  );
};

export default AddProducts;
