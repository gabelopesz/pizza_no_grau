import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const CategoryTable = ({ categories, onDelete, onEdit }) => (
  <TableContainer component={Paper} sx={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>
            ID
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>
            Nome
          </TableCell>
          <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "16px" }}>
            Ações
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center" sx={{ fontSize: "14px" }}>{category.id}</TableCell>
            <TableCell align="center" sx={{ fontSize: "14px" }}>{category.name}</TableCell>
            <TableCell align="center">
              <IconButton
                color="primary"
                onClick={() => onEdit(category.id)}
                sx={{ margin: "0 4px" }}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => onDelete(category.id)}
                sx={{ margin: "0 4px" }}
              >
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default CategoryTable;
