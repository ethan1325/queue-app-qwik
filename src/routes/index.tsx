import { $, component$, useClientEffect$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import LargeBox from "~/components/large-box";
import SmallBox from "~/components/small-box";
import { Queue } from "~/models/Queue";
import auth from "~/services/auth-service";

export default component$(() => {
  useClientEffect$(() => {
    if (!auth.isLoggedIn()) {
      location.replace("http://localhost:5173/login");
    }
  });

  const logout = $(() => {
    auth.logout();
  });

  return (
    <div class="h-screen w-screen bg-frost">
      <img
        src="logout.png"
        alt=""
        class="absolute top-0 right-0 p-2 cursor-pointer"
        onClick$={logout}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Queue App",
};
