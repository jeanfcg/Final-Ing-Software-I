import axios from 'axios';

class UserService {
  static async getUserById(id) {
    try {
      const response = await axios.get(`/api/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
      throw error;
    }
  }
}

export default UserService;
