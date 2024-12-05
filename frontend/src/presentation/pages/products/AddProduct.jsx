import React from 'react';
import AddEditProductForm from '../../Components/AddEditProductForm';
import { createProduct } from '../../../application/useCases/product/createProduct';
import { useNavigate } from 'react-router-dom';  // Importe useNavigate

const AddProduct = () => {
  const navigate = useNavigate();  // Inicialize o hook de navegação

  const handleAdd = async (data) => {
    try {
      // Chama a função para adicionar o produto
      await createProduct(data);
      alert('Produto adicionado com sucesso!');
      
      // Redireciona para a lista de produtos após o sucesso
      navigate('/products');  // Redireciona para a página de produtos
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto.');
    }
  };

  return <AddEditProductForm onSubmit={handleAdd} />;
};

export default AddProduct;
