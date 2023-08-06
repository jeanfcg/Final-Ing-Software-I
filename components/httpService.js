import axios from "axios";

class HttpService {
  static async get(url) {
    return await axios.get(url);
  }

  static async post(url) {
    return await axios.post(url);
  }
}

export default HttpService;
