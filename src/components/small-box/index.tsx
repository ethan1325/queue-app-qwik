import { component$, useClientEffect$ } from "@builder.io/qwik";
import { Queue } from "~/models/Queue";

export default component$((queue: Queue) => {
  // useClientEffect$(() => console.log(queue.id));

  const renderMessage = () => {
    if (queue.status === "waiting") {
      return <p class="font-light">Mohon menunggu</p>;
    } else {
      return <p class="font-light">Sedang dilayani di meja {queue.table}</p>;
    }
  };
  
  return (
    <div class="w-full h-full">
      <div class="h-full w-full rounded-md  flex items-center justify-center bg-gray-800  text-center flex-col  text-white">
        <p class="text-2xl font-bold">
          ANTRIAN <span class="text-blue-500">{queue.id}</span>
        </p>
        {renderMessage()}
      </div>
    </div>
  );
});
