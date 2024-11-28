import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/database";
import { userRoutes } from "./routes/userRoutes";
import { productRoutes } from "./routes/productRoutes";
import { orderRoutes } from "./routes/orderRoutes";
import { categoryRoutes } from "./routes/categoryRoutes";
import { cartRoutes } from "./routes/cartRoutes";
import { addressRoutes } from "./routes/addressRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");

    // Registrar rotas
    app.use("/categories", categoryRoutes);
    app.use("/users", userRoutes);
    app.use("/products", productRoutes);
    app.use("/orders", orderRoutes);
    app.use("/carts", cartRoutes);
    app.use("/addresses", addressRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
