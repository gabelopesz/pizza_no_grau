import React, { useState, useEffect } from "react";
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
import { listCategories } from "../../application/useCases/category/listCategories.js";
import { deleteCategory } from "../../application/useCases/category/deleteCategory.js";

const CategoriesCrud = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await listCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      alert("Erro ao deletar categoria.");
    }
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
        Gerenciamento de Categorias
      </Typography>
      <Button
        variant="contained"
        sx={{
          marginBottom: 2,
          backgroundColor: "#F54749",
          "&:hover": { backgroundColor: "#D63939" },
        }}
        onClick={() => navigate("/add-categories")} // Navegação para AddCategories
      >
        Adicionar Categoria
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit-category/${category.id}`)} // Navegação para EditCategory
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        sx={{
          marginTop: 3,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          color: "#F54749",
          borderColor: "#F54749",
          "&:hover": {
            backgroundColor: "#F54749",
            color: "#fff",
            borderColor: "#F54749",
          },
        }}
        onClick={() => navigate("/")}
      >
        Voltar ao Menu
      </Button>
    </Box>
  );
};

export default CategoriesCrud;
