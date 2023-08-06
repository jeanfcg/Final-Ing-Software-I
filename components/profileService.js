import axios from "axios";

class ProfileService {
  static async getProfile() {
    try 
    {
      // Hacemos una solicitud GET a la API para obtener el perfil del usuario.
      const res = await axios.get("/api/profile");
      return res.data.username;
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      return 0;
    }
  }
}

export default ProfileService;
