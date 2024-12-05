import React, { useEffect, useState } from "react";
import AddEditProductForm from "../../Components/AddEditProductForm";
import { updateProduct } from "../../../application/useCases/product/updateProduct";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else {
      navigate("/"); 
    }
  }, [location.state, navigate]);

  const handleEdit = async (data) => {
    try {
      await updateProduct(product.id, data);
      alert("Produto atualizado com sucesso!");
      navigate("/products"); 
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
  };

  if (!product) {
    return <p>Produto não encontrado ou carregando...</p>;
  }

  return <AddEditProductForm onSubmit={handleEdit} initialData={product} isEdit />;
};

export default EditProduct;
