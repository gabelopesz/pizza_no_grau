import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../../application/useCases/product/fetchProducts.js";
import { deactivateProduct } from "../../../application/useCases/product/deactivateProduct.js";
import { activateProduct } from "../../../application/useCases/product/activateProduct.js";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../Components/ProductTable.jsx";

const ProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        alert("Não foi possível carregar a lista de produtos.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeactivateProduct = async (id) => {
    setProcessing(true);
    try {
      await deactivateProduct(id);
      setProducts(products.map((product) => (product.id === id ? { ...product, isActive: false } : product)));
    } catch (error) {
      console.error(`Erro ao desativar produto com ID ${id}:`, error);
      alert("Não foi possível desativar o produto.");
    } finally {
      setProcessing(false);
    }
  };

  const handleActivateProduct = async (id) => {
    setProcessing(true);
    try {
      await activateProduct(id);
      setProducts(products.map((product) => (product.id === id ? { ...product, isActive: true } : product)));
    } catch (error) {
      console.error(`Erro ao ativar produto com ID ${id}:`, error);
      alert("Não foi possível ativar o produto.");
    } finally {
      setProcessing(false);
    }
  };

  const handleEditProduct = (product) => {
    navigate(`/edit-product/${product.id}`, { state: { product } }); 
  };

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
        Gerenciamento de Produtos
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/add-product")}
        sx={{ marginBottom: 2 }}
        disabled={processing}
      >
        Adicionar Produto
      </Button>
      {loading ? (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <CircularProgress />
          <Typography variant="body1">Carregando produtos...</Typography>
        </Box>
      ) : (
        <ProductTable
          products={products}
          onDeactivate={processing ? null : handleDeactivateProduct}
          onActivate={processing ? null : handleActivateProduct}
          onEdit={handleEditProduct} 
        />
      )}
    </Box>
  );
};

export default ProductCRUD;
