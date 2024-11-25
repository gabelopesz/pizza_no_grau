import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export class ProductRepository {
  // Listar todos os produtos (pode incluir filtro para somente ativos)
  async list(onlyActive = true) {
    const response = await axios.get(`${API_URL}?onlyActive=${onlyActive}`);
    return response.data;
  }

  // Adicionar um novo produto com suporte a upload de imagem
  async add(product) {
    const formData = new FormData();

    // Adiciona os campos do produto ao FormData
    Object.keys(product).forEach((key) => {
      if (key === 'image') {
        formData.append(key, product[key]); // Upload da imagem
      } else {
        formData.append(key, product[key]);
      }
    });

    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }

  // Desativar um produto
  async deactivate(id) {
    await axios.patch(`${API_URL}/${id}/deactivate`);
  }

  // Ativar um produto
  async activate(id) {
    await axios.patch(`${API_URL}/${id}/activate`);
  }

  // Atualizar um produto existente
  async update(id, product) {
    const formData = new FormData();

    // Adiciona os campos do produto ao FormData
    Object.keys(product).forEach((key) => {
      if (key === 'image') {
        formData.append(key, product[key]); // Upload da imagem
      } else {
        formData.append(key, product[key]);
      }
    });

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }
}
