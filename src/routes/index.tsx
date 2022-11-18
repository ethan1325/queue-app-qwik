import { component$, useClientEffect$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import auth from "~/services/auth-service";

export default component$(() => {
  useClientEffect$(() => {
    if (!auth.isLoggedIn()) {
      location.replace("http://localhost:5173/login");
    }
  });

  return (
    <div>
      <div class="i">
        <h1 class="text-5xl text-white py-3 border-b-2 w-1/4">Dashboard</h1>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Queue App",
};
