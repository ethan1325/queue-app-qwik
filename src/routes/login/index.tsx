import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import LoginBox from "~/components/login-box";

export default component$(() => {
  return (
    <div class="w-screen h-screen bg-sky-200 flex justify-center items-center">
      <LoginBox/>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Login",
};
