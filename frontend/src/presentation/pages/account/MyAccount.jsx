import { Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const PageContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}));

const FormContainer = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 600,
  margin: "0 auto",
}));

const MyAccount = () => {
  const [formData, setFormData] = useState({
    name: "Gabriel Lopes Martins", // Nome exemplo, substitua com dados reais
    email: "gabriel@example.com", // E-mail exemplo
    password: "", // O campo senha começa vazio por segurança
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados atualizados:", formData);
    alert("Informações atualizadas com sucesso!");
  };

  return (
    <PageContainer>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 3,
          fontWeight: "bold", // Negrito aplicado
          textAlign: "center", // Centralizado
          color: "text.secondary",
        }}
      >
        Minha Conta (Alterar Informações)
      </Typography>
      <FormContainer>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Campo Nome */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Campo E-mail */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Campo Senha */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Digite sua nova senha"
                  variant="outlined"
                />
              </Grid>

              {/* Botão Atualizar */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%", padding: 1 }}
                >
                  Atualizar Informações
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </FormContainer>
    </PageContainer>
  );
};

export default MyAccount;
