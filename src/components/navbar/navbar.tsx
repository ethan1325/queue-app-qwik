import { $, component$, useStylesScoped$ } from "@builder.io/qwik";
import auth from "~/services/auth-service";
import styles from "./navbar.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const logout = $(() => {
    auth.logout();
  });

  return (
    <div class="">
      <div class="fixed top-0 left-0 h-screen flex flex-col bg-gray-900 text-white shadow-inner overflow-auto scrollbar">
        <a href="/">
          <div class="sidebar-icon bg-blue-700 cursor-default">
            <img src="Assets/queue.png" alt="" class="h-8 w-h-8" />
          </div>
        </a>
        <div class="divider"></div>
        <div class="sidebar-icon">
          <img src="Assets/home.png" alt="" class="h-8 w-h-8" />
        </div>
        <a href="/display">
          <div class="sidebar-icon">
            <img src="Assets/display.png" alt="" class="h-8 w-h-8" />
          </div>
        </a>
        <div class="sidebar-icon" onClick$={logout}>
          <img src="Assets/logout.png" alt="" class="h-8 w-h-8" />
        </div>
      </div>
    </div>
  );
});
