import { AccountCircle, Category, ExitToApp, Info, People, ShoppingCart } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/Logo.png"; // Ajuste o caminho da logo conforme necessário

const drawerWidth = 230;

// Estilo do menu lateral (Drawer)
const DrawerStyled = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: "#E9524D", // Fundo vermelho
    color: "#FFFFFF", // Branco para texto e ícones
    boxShadow: "2px 0 5px rgba(0,0,0,0.2)", // Sombra sutil
  },
}));

// Contêiner para a logo
const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2), // Espaçamento interno
  borderBottom: `1px solid rgba(255, 255, 255, 0.2)`, // Linha separadora
}));

// Estilo da imagem da logo
const LogoImage = styled("img")({
  width: 140, // Largura da logo
  height: "auto",
});

// Contêiner para o conteúdo principal (itens do menu)
const ContentBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

// Contêiner para o menu (lista de itens)
const MenuContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// Rodapé do menu lateral
const Footer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(1),
  borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
  color: "rgba(255, 255, 255, 0.9)",
  fontSize: "0.9rem", // Fonte maior no rodapé
}));

// Estilo para botões do menu
const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Efeito hover
  },
  borderRadius: theme.spacing(1), // Bordas arredondadas
  margin: theme.spacing(0.5, 1), // Espaçamento interno
}));

// Estilo para os títulos do menu (seções)
const MenuTitle = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: "rgba(255, 255, 255, 0.9)", // Branco com maior contraste
  textTransform: "uppercase", // Letras maiúsculas
  fontSize: "1rem", // Tamanho maior do título
}));

// Estilo para os itens do menu
const MenuText = styled(ListItemText)({
  "& .MuiListItemText-primary": {
    fontSize: "1rem", // Fonte maior
    fontWeight: 500, // Peso intermediário para maior legibilidade
    letterSpacing: "0.5px", // Aumenta o espaçamento entre letras
  },
});

// Dados do menu lateral
const menuSections = [
  {
    title: "Gerenciamento",
    items: [
      { text: "Minha conta", icon: <AccountCircle />, path: "/account" },
      { text: "Categorias", icon: <Category />, path: "/categories" },
      { text: "Usuários", icon: <People />, path: "/users" },
      { text: "Produtos", icon: <ShoppingCart />, path: "/products" },
    ],
  },
  {
    title: "Informações",
    items: [{ text: "Sobre a pizzaria", icon: <Info />, path: "/pizzaria" }],
  },
  {
    title: "Ações",
    items: [{ text: "Sair", icon: <ExitToApp />, path: "/login" }],
  },
];

const SideMenu = () => {
  return (
    <DrawerStyled variant="permanent" anchor="left">
      {/* Logo */}
      <LogoContainer>
        <LogoImage src={logoImage} alt="Logo Pizza no Grau" />
      </LogoContainer>

      {/* Conteúdo principal */}
      <ContentBox>
        {/* Menu principal */}
        <MenuContainer>
          {menuSections.map((section, index) => (
            <Box key={index}>
              <MenuTitle>{section.title}</MenuTitle>
              <List>
                {section.items.map((item, idx) => (
                  <ListItem key={idx} disablePadding>
                    <MenuItemButton component={Link} to={item.path}>
                      <ListItemIcon sx={{ color: "#FFFFFF" }}>{item.icon}</ListItemIcon>
                      <MenuText primary={item.text} />
                    </MenuItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </MenuContainer>

        {/* Linha divisória */}
        <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

        {/* Rodapé */}
        <Footer>© 2024 Pizza no Grau</Footer>
      </ContentBox>
    </DrawerStyled>
  );
};

export default SideMenu;