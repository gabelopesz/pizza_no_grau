import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductsCrud = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // For navigation

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#F9F9FA",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "#80869A",
        }}
      >
        Gerenciamento de Produtos
      </Typography>
      <Button
        variant="contained"
        sx={{
          marginBottom: 2,
          backgroundColor: "#F54749",
          "&:hover": { backgroundColor: "#D63939" },
        }}
        onClick={() => navigate("/add-product")} // Navigate to AddProducts
      >
        Adicionar Produto
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsCrud;
