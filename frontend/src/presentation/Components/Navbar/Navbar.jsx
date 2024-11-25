import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#E9524D' }}> {/* Cor de fundo vermelha */}
      <Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF' }}> {/* Cor do título branco */}
            Pizza no Grau
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/product"
              sx={{
                color: '#FFFFFF', // Texto branco
                '&:hover': {
                  backgroundColor: '#ebb94b', // Amarelo no hover
                },
              }}
            >
              Produtos
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/users"
              sx={{
                color: '#FFFFFF', // Texto branco
                '&:hover': {
                  backgroundColor: '#ebb94b', // Amarelo no hover
                },
              }}
            >
              Usuários

            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/categories"
              sx={{
                color: '#FFFFFF', // Texto branco
                '&:hover': {
                  backgroundColor: '#ebb94b', // Amarelo no hover
                },
              }}
            >
              Categorias
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;