import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const AddCoupon = ({ onAdd, nextId }) => {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expirationDate: "",
  });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.code.trim() &&
      formData.discount.trim() &&
      formData.expirationDate.trim()
    ) {
      onAdd({ ...formData, id: nextId });
      navigate("/"); // Navigate back to CouponCRUD
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
        Adicionar Cupom
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Código"
          name="code"
          value={formData.code}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Desconto (%)"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Data de Expiração"
          name="expirationDate"
          type="date"
          value={formData.expirationDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
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

export default AddCoupon;
