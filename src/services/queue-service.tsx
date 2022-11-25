import auth from "~/services/auth-service";
import axios from "axios";
import { Queue } from "~/models/Queue";

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

  async deleteQueue(id: number){
    const response = await axios.delete(`${this.apiUrl}/${id}`, {
      headers: {
        "Authorization": "Bearer " + auth.getToken()
      }
    });
  }

  async addQueue(){
    const newQueue: Queue = {
      id: -1,
      status: "waiting"
    }
    const response = await axios.post(this.apiUrl, newQueue,{
      headers: {
        "Authorization": "Bearer " + auth.getToken()
      }
    })
    return response.data;
  }

  async saveQueue(queue: Queue){
    const response = await axios.post(this.apiUrl +'/update', queue,{
      headers: {
        "Authorization": "Bearer " + auth.getToken()
      }
    })
    return response.data;
  }
}

const QueueServiceProvider = new QueueService();
export default QueueServiceProvider;
