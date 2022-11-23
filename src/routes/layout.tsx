import { $, component$, Slot, useClientEffect$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Navbar from "~/components/navbar/navbar";
import auth from "~/services/auth-service";

export default component$(() => {
  //   useClientEffect$(() => {
  //     if (!auth.isLoggedIn()) {
  //       location.replace("http://localhost:5173/login");
  //     }
  //   });

  return (
    <div class="min-h-screen min-w-screen bg-gray-800">
      <Navbar />
      <div class="ml-24 h-full">
        <Slot /> {}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Queue App",
};
