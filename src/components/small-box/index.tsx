import { component$, useClientEffect$ } from "@builder.io/qwik";
import { Queue } from "~/models/Queue";

export default component$((queue: Queue) => {
  useClientEffect$(()=>console.log(queue.id));
  return (
    <div class="w-1/4 h-100">
      <div class="h-full w-full rounded-md  flex items-center justify-center bg-sky-200 text-2xl text-gray-500 font-bold text-center">
        <p>ANTRIAN <span class="text-blue-500">{queue.id}</span></p>
      </div>  
    </div>
  );
});
