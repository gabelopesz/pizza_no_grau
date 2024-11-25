import React, { useState, useEffect } from "react";
import { listCategories } from "../../application/useCases/category/listCategories.js";
import { deleteCategory } from "../../application/useCases/category/deleteCategory.js";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoryTable from "../components/CategoryTable.jsx";

const CategoriesCrud = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        alert("Erro ao carregar categorias.");
      }
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
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Gerenciamento de Categorias
      </Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate("/add-category")}
      >
        Adicionar Categoria
      </Button>
      <CategoryTable
        categories={categories}
        onDelete={handleDeleteCategory}
        onEdit={(id) => navigate(`/edit-category/${id}`)}
      />
    </Box>
  );
};

export default CategoriesCrud;
