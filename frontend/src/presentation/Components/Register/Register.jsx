import React, { useState } from "react";
import { TextField, Box, Button, Typography, Link, InputAdornment } from "@mui/material";
import { FaLock, FaUser } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Dados de Registro:", { name, email, password });
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
        Registre-se
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaLock style={{ color: "#F54749" }} />
              </InputAdornment>
            ),
          }}
        />
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
          Registrar
        </Button>
        <Typography sx={{ fontSize: "14.5px", marginTop: 2 }}>
          Já possui uma conta?{" "}
          <Link href="/login" underline="hover" sx={{ color: "#F54749", fontWeight: "800" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
