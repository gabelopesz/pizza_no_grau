import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from "@mui/material";
import { Edit, Delete, Restore } from "@mui/icons-material";

const ProductTable = ({ products, onDeactivate, onActivate, onEdit }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>R$ {parseFloat(product.price).toFixed(2)}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:3000/${product.imageUrl}`}
                    alt={product.name}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{product.isActive ? "Ativo" : "Inativo"}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => onEdit(product)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  {product.isActive ? (
                    <Tooltip title="Desativar">
                      <IconButton color="secondary" onClick={() => onDeactivate(product.id)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Ativar">
                      <IconButton color="success" onClick={() => onActivate(product.id)}>
                        <Restore />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Nenhum produto encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
