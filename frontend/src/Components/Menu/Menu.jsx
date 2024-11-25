import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 450,
        backgroundColor: "#F9F9FA",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        borderRadius: 2,
        padding: 4,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        margin: "100px auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2, color: "#333" }}>
        Menu Principal
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          fullWidth
          sx={{
            height: "45px",
            backgroundColor: "#F54749",
            borderRadius: "40px",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#D63939",
            },
          }}
          onClick={() => navigate("/products")}
        >
          Gerenciar Produtos
        </Button>
        <Button
          fullWidth
          sx={{
            height: "45px",
            backgroundColor: "#F54749",
            borderRadius: "40px",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#D63939",
            },
          }}
          onClick={() => navigate("/coupon")}
        >
          Gerenciar Cupons
        </Button>
        <Button
          fullWidth
          sx={{
            height: "45px",
            backgroundColor: "#F54749",
            borderRadius: "40px",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#D63939",
            },
          }}
          onClick={() => navigate("/user")}
        >
          Gerenciar Usuários
        </Button>
        <Button
          fullWidth
          sx={{
            height: "45px",
            backgroundColor: "#F54749",
            borderRadius: "40px",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#D63939",
            },
          }}
          onClick={() => navigate("/categories")}
        >
          Gerenciar Categorias
        </Button>
      </Box>
    </Box>
  );
};

export default Menu;
