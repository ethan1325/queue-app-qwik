import auth from "~/services/auth-service";
import axios from "axios";

export class QueueService {
  private apiUrl = "http://localhost:8080/queue";
  async getAll() {
    const response = await axios.get(this.apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + auth.getToken(),
      },
    });
    return response.data;
  }
}

const QueueServiceProvider = new QueueService();
export default QueueServiceProvider;
