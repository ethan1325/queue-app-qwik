import axios from "axios";
import { Table } from "~/models/Table";
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

  async addTable(newId: number){
    const newTable: Table = {
      id: newId,
      status: "available"
    }
    const response = await axios.post(this.apiUrl, newTable,{
      headers: {
        "Authorization": "Bearer " + auth.getToken()
      }
    })
    return response.data;
  }

  async deleteTable(id: number){
    await axios.delete(`${this.apiUrl}/${id}`, {
      headers: {
        "Authorization": "Bearer " + auth.getToken()
      }
    });
  }

  async saveTable(table: Table){
    const response = await axios.post(this.apiUrl, table,{
      headers: {
        "Authorization": "Bearer " + auth.getToken()
      }
    })
    return response.data;
  }
}

const TableServiceProvider = new TableService();
export default TableServiceProvider;
