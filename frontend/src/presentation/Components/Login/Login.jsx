import React, { useState } from "react";
import { TextField, Box, Button, Typography, Link, InputAdornment } from "@mui/material";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook de navegação

  // Função chamada no submit do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Realiza o redirecionamento para o menu após o login
    navigate("/menu");
  };

  // Função para redirecionar para a tela de registro
  const handleRegisterRedirect = () => {
    navigate("/register"); // Redireciona para a página de registro
  };

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
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="E-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaUser style={{ color: "#F54749" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaLock style={{ color: "#F54749" }} />
              </InputAdornment>
            ),
          }}
        />
        <Link
          href="#"
          underline="hover"
          sx={{
            display: "block",
            textAlign: "right",
            fontSize: "14px",
            marginTop: "-10px",
            color: "#F54749",
          }}
        >
          Esqueceu a senha?
        </Link>
        <Button
          type="submit"
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
        >
          Login
        </Button>
        <Typography sx={{ fontSize: "14.5px", marginTop: 2 }}>
          Não possui uma conta?{" "}
          <Link
            onClick={handleRegisterRedirect} // Chama o redirecionamento para o registro
            underline="hover"
            sx={{ color: "#F54749", fontWeight: "800", cursor: "pointer" }}
          >
            Registre-se
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
