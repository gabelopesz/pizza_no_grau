import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import { Edit, Delete, Restore } from '@mui/icons-material';

const UserTable = ({ users, onDeactivate, onActivate, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Senha</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{'*'.repeat(8)}</TableCell>
                <TableCell>{user.active ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => onEdit(user)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  {user.active ? (
                    <Tooltip title="Desativar">
                      <IconButton color="secondary" onClick={() => onDeactivate(user.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Ativar">
                      <IconButton color="success" onClick={() => onActivate(user.id)}>
                        <Restore />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhum usuário encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
