import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export class ProductRepository {
    async list(onlyActive = true) {
      try {
        const response = await axios.get(`${API_URL}?onlyActive=${onlyActive}`);
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        throw error;
      }
    }  

  async add(product) {
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === 'image') {
        formData.append(key, product[key]);
      } else {
        formData.append(key, product[key]);
      }
    });
    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  async deactivate(id) {
    await axios.patch(`${API_URL}/${id}/deactivate`);
  }

  async activate(id) {
    await axios.patch(`${API_URL}/${id}/activate`);
  }

  async update(id, product) {
    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === 'image') {
        formData.append(key, product[key]);
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
