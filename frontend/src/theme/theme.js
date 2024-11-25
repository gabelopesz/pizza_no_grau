import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E9524D", // Vermelho principal
    },
    background: {
      default: "#FFFFFF", // Fundo
    },
    text: {
      primary: "#80869A", // Cinza para textos
    },
    grey: {
      100: "#D9D9D9", // Cinza claro
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Fonte padrão
  },
});

export default theme;
