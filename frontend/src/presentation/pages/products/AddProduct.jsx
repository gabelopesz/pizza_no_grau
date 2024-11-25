import React from 'react';
import AddEditProductForm from '../../Components/AddEditProductForm';
import { createProduct } from '../../../application/useCases/product/createProduct';

const AddProduct = () => {
  const handleAdd = async (data) => {
    await createProduct(data);
    alert('Produto adicionado com sucesso!');
  };

  return <AddEditProductForm onSubmit={handleAdd} />;
};

export default AddProduct;
