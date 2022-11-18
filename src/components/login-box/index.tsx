import { $, component$, useClientEffect$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import Swal from "sweetalert2";
import { User } from "~/models/User";
import auth from "~/services/auth-service";
import styles from "./login.css?inline";

export default component$(({ request, response }: any) => {
  useStylesScoped$(styles);
  const state = useStore({ username: "", password: "" });
  useClientEffect$(() => {
    if (auth.isLoggedIn()) {
      location.replace("http://localhost:5173");
    }
  });

  const login = $(() => {
    const user: User = {
      username: state.username,
      password: state.password,
    };
    console.log(auth.isLoggedIn());
    if (!auth.isLoggedIn()) {
      auth
        .login(user)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            Swal.fire({
              title: "Login Failed!",
              text: "Wrong Credentials!",
              icon: "error",
              confirmButtonText: "OK",
              heightAuto: false,
            });
          }
        })
        .then((token) => {
          if (token) {
            auth.doLoginUser(user.username, token);
            Swal.fire({
              title: "Login Success!",
              text: "Welcome, " + state.username,
              icon: "success",
              confirmButtonText: "OK",
              heightAuto: false,
            }).then((result) => {
              if (result.isConfirmed) {
                location.replace("http://localhost:5173");
              }
            });
          }
        })
        .catch((error) =>
          Swal.fire({
            title: "ERROR",
            text: error,
            icon: "error",
            confirmButtonText: "OK",
            heightAuto: false,
          })
        );
    } else {
      Swal.fire({
        title: "ERROR",
        text: "User is logged in, please log out first!",
        icon: "error",
        confirmButtonText: "OK",
        heightAuto: false,
      });
    }
  });

  return (
    <div class="w-72 flex justify-center items-center bg-gray-900 rounded-lg shadow-xl sm:w-96 md:w-[500px] flex-col pb-5">
      <div class="flex flex-col text-center p-7 m-5 rounded-full bg-gray-800 aspect-square items-center justify-center">
        <h1 class="text-4xl font-bold text-white">QUEUE</h1>
        <h1 class="text-4xl font-bold text-white">APP</h1>
      </div>
      <form action="" onSubmit$={login} preventdefault:submit>
        <div class="mb-4">
          <label
            class="block text-white text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none bg-gray-800 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={state.username}
            onInput$={(event) => {
              const input = event.target as HTMLInputElement;
              state.username = input.value;
            }}
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-white text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="bg-gray-800 shadow appearance-none rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline focus:background-gray-400"
            id="password"
            type="password"
            placeholder="******************"
            value={state.password}
            onInput$={(event) => {
              const input = event.target as HTMLInputElement;
              state.password = input.value;
            }}
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            SIGN IN
          </button>
        </div>
      </form>
    </div>
  );
});
