import axios from "axios";
import auth from "~/services/auth-service";

export class TableService {
  private apiUrl = "http://localhost:8080/table";
  async getAll() {
    const response = await axios.get(this.apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.getToken(),
      },
    });
    return response.data;
  }
}

const TableServiceProvider = new TableService();
export default TableServiceProvider;
