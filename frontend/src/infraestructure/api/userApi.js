import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export class UserRepository {
  async list() {
    const response = await axios.get(API_URL);
    return response.data;
  }

  async add(user) {
    const response = await axios.post(API_URL, user);
    return response.data;
  }

  async deactivate(id) {
    await axios.patch(`${API_URL}/${id}/deactivate`);
  }

  async activate(id) {
    await axios.patch(`${API_URL}/${id}/activate`);
  }

  async update(id, user) {
    const response = await axios.put(`${API_URL}/${id}`, user); // Método PUT para edição
    return response.data;
  }
}
