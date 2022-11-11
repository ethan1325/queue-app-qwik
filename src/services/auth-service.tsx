import Swal from "sweetalert2";
import { User } from "~/models/User";

export class AuthService {
  private apiUrl = "http://localhost:8080/authenticate";
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string | null;
  async login(user: User){
    return fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
  }

  isLoggedIn() {
    if(this.getToken() !== "undefined" && this.getToken() !== null){
      console.log(this.getToken());
      return true;
    }else {
      return false;
    }
  }

  doLoginUser(username: string, token: string) {
    this.loggedUser = username;
    this.storeToken(token);
    console.log(this.getToken());
  }

  storeToken(token: string){
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  logout(){
    if(this.isLoggedIn()){
      this.loggedUser = null;
      this.removeToken();
      Swal.fire({
        title: 'Log Out Success',
        icon: 'success',
        confirmButtonText: 'OK',
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          location.replace("http://localhost:5173/login");
        }
      });
    } else {
      Swal.fire({
        title: 'You are not logged in!',
        icon: 'error',
        confirmButtonText: 'OK',
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          location.replace("http://localhost:5173/login");
        }
      });
    }
  }

  removeToken(){
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }
}

const AuthServiceProvider = new AuthService();
export default AuthServiceProvider;
