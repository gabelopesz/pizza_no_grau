import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CouponCrud = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleDeleteCoupon = (id) => {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#F9F9FA",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          marginBottom: 2,
          textAlign: "center",
          color: "#80869A",
        }}
      >
        Gerenciamento de Cupons
      </Typography>
      <Button
        variant="contained"
        sx={{
          marginBottom: 2,
          backgroundColor: "#F54749",
          "&:hover": { backgroundColor: "#D63939" },
        }}
        onClick={() => navigate("/add-coupon")} // Navigate to AddCoupon page
      >
        Adicionar Cupom
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Código</TableCell>
              <TableCell>Desconto (%)</TableCell>
              <TableCell>Data de Expiração</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.id}</TableCell>
                <TableCell>{coupon.code}</TableCell>
                <TableCell>{coupon.discount}</TableCell>
                <TableCell>{coupon.expirationDate}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteCoupon(coupon.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CouponCrud;
