import { $, component$, useStore } from "@builder.io/qwik";
import Swal from "sweetalert2";
import { User } from "~/models/User";
import auth from "~/services/auth-service";

export default component$(() => {
  const state = useStore({ username: "", password: "" });

  const login = $(() => {
    const user: User = {
      username: state.username,
      password: state.password,
    };
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
    <div class="w-72 flex justify-center items-center bg-white rounded-lg shadow-xl sm:w-96 md:w-[500px] flex-col pb-5">
      <img src="logo.png" alt="" class="w-[250px]" />
      <form action="" onSubmit$={login} preventdefault:submit>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            SIGN IN
          </button>
        </div>
      </form>
    </div>
  );
});
