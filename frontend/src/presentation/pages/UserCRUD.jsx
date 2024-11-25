import React, { useEffect, useState } from "react";
import { listUsers } from "../../application/useCases/user/listUsers.js";
import { deactivateUser } from "../../application/useCases/user/deactivateUser.js";
import { activateUser } from "../../application/useCases/user/activateUser.js";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserTable from "../Components/UserTable.jsx";

const UserCRUD = () => {
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento
  const [processing, setProcessing] = useState(false); // Estado para indicar ações em andamento
  const navigate = useNavigate();

  // Função para buscar a lista de usuários
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await listUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        alert("Não foi possível carregar a lista de usuários.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Função para desativar um usuário
  const handleDeactivateUser = async (id) => {
    setProcessing(true);
    try {
      await deactivateUser(id);
      setUsers(users.map((user) => (user.id === id ? { ...user, active: false } : user)));
    } catch (error) {
      console.error(`Erro ao desativar usuário com ID ${id}:`, error);
      alert("Não foi possível desativar o usuário.");
    } finally {
      setProcessing(false);
    }
  };

  // Função para ativar um usuário
  const handleActivateUser = async (id) => {
    setProcessing(true);
    try {
      await activateUser(id);
      setUsers(users.map((user) => (user.id === id ? { ...user, active: true } : user)));
    } catch (error) {
      console.error(`Erro ao ativar usuário com ID ${id}:`, error);
      alert("Não foi possível ativar o usuário.");
    } finally {
      setProcessing(false);
    }
  };

  // Renderização
  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Gerenciamento de Usuários
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/add-user")}
        sx={{ marginBottom: 2 }}
        disabled={processing} // Desativa o botão enquanto processa
      >
        Adicionar Usuário
      </Button>
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <CircularProgress />
          <Typography variant="body1">Carregando usuários...</Typography>
        </Box>
      ) : (
        <UserTable
          users={users}
          onDeactivate={processing ? null : handleDeactivateUser}
          onActivate={processing ? null : handleActivateUser}
          onEdit={(user) => !processing && navigate(`/edit-user/${user.id}`)}
        />
      )}
    </Box>
  );
};

export default UserCRUD;
