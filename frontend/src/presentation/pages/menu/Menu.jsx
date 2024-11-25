import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    height: "45px",
    backgroundColor: "#F54749",
    borderRadius: "40px",
    fontWeight: "bold",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#D63939",
    },
  };

  return (
    <Box
      sx={{
        maxWidth: 450,
        backgroundColor: "#F9F9FA",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 2,
        padding: 4,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ marginBottom: 3, color: "#333", fontWeight: "bold" }}
      >
        Menu Principal
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        <Button fullWidth sx={buttonStyle} onClick={() => navigate("/products")}>
          Gerenciar Produtos
        </Button>
        <Button fullWidth sx={buttonStyle} onClick={() => navigate("/users")}>
          Gerenciar Usuários
        </Button>
        <Button
          fullWidth
          sx={buttonStyle}
          onClick={() => navigate("/categories")}
        >
          Gerenciar Categorias
        </Button>
      </Box>
    </Box>
  );
};

export default Menu;
