import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listUsers } from "../../application/useCases/user/listUsers.js";
import { editUser } from "../../application/useCases/user/editUser.js";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const EditUser = () => {
  const { id } = useParams(); // Captura o parâmetro :id da URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true); // Para indicar carregamento

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await listUsers(); // Busca a lista de usuários
        const user = users.find((u) => u.id.toString() === id); // Encontra o usuário pelo ID
        if (user) {
          setFormData({
            name: user.name,
            email: user.email,
            password: "", // Deixe a senha vazia para evitar exibi-la
          });
        } else {
          alert("Usuário não encontrado!");
          navigate("/"); // Redireciona para a página principal
        }
      } catch (error) {
        console.error("Erro ao carregar o usuário:", error);
        alert("Erro ao carregar os dados do usuário.");
      } finally {
        setLoading(false); // Carregamento concluído
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(id, formData); // Atualiza os dados do usuário
      alert("Usuário atualizado com sucesso!");
      navigate("/"); // Redireciona para a página principal
    } catch (error) {
      console.error("Erro ao editar o usuário:", error);
      alert("Erro ao salvar as alterações.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="body1">Carregando dados do usuário...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, maxWidth: "400px", margin: "0 auto" }} component={Paper}>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
        Editar Usuário
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
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Nova Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Salvar Alterações
        </Button>
      </form>
    </Box>
  );
};

export default EditUser;
