import React from 'react';
import AddEditProductForm from '../Components/AddEditProductForm';
import { updateProduct } from '../../application/useCases/product/updateProduct';

const EditProduct = ({ initialData }) => {
  const handleEdit = async (data) => {
    await updateProduct(initialData.id, data);
    alert('Produto atualizado com sucesso!');
  };

  return <AddEditProductForm onSubmit={handleEdit} initialData={initialData} isEdit />;
};

export default EditProduct;
