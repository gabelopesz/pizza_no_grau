import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const PageContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  maxWidth: 800,
  marginLeft: "auto",
  marginRight: "auto",
}));

const AboutCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const SobrePizzaria = () => {
  return (
    <PageContainer>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 3,
          color: "#000000", // Cor preta para o título
        }}
      >
        Sobre a Pizzaria
      </Typography>
      <AboutCard>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#E9524D" }}
          >
            Nossa História
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, color: "#000000" }}>
            A Pizza no Grau começou em 2010, como um pequeno sonho de trazer
            sabores únicos e experiências inesquecíveis para os amantes de
            pizza. Desde então, temos trabalhado incansavelmente para oferecer
            a melhor qualidade e sabor para nossos clientes.
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#E9524D" }}
          >
            Missão
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, color: "#000000" }}>
            Oferecer pizzas artesanais, preparadas com os melhores ingredientes
            e um atendimento excepcional, garantindo a satisfação de nossos
            clientes.
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#E9524D" }}
          >
            Horário de Funcionamento
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, color: "#000000" }}>
            Segunda a Sexta: 18:00 - 23:30 <br />
            Sábado e Domingo: 16:00 - 00:00
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#E9524D" }}
          >
            Endereço
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, color: "#000000" }}>
            Av. Pres. Vargas, 123 <br />
            Centro <br />
            Rio Verde - Goiás
          </Typography>

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2, color: "#E9524D" }}
          >
            Contato
          </Typography>
          <Typography variant="body1" sx={{ color: "#000000" }}>
            Telefone: (64) 99765-4321 <br />
            WhatsApp: (64) 99123-5678 <br />
            E-mail: contato@pizzanograu.com.br
          </Typography>
        </CardContent>
      </AboutCard>
    </PageContainer>
  );
};

export default SobrePizzaria;
