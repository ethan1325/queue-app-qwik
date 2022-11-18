import { component$, useClientEffect$ } from "@builder.io/qwik";
import { Queue } from "~/models/Queue";

export default component$((queue: Queue) => {
  const renderMessage = () => {
    if (queue.status === "waiting") {
      return <p>Mohon menunggu</p>;
    } else {
      return <p class="text-3xl font-light">Mohon menuju meja {queue.table}</p>;
    }
  };
  return (
    <div class="w-full h-3/5 p-3 flex justify-center align-middle">
      <div class="w-3/4 h-full rounded-md flex justify-center items-center bg-gray-800 shadow text-white flex-col gap-3">
        <h1 class="text-7xl text-center font-bold">
          ANTRIAN <span class="text-blue-500">{queue.id}</span>
        </h1>
        {renderMessage()}
      </div>
    </div>
  );
});

// export default component$<{
//   queue: Queue
// }> ((props) => {
//   return (
//     <div class="w-full h-3/5 p-3 flex justify-center align-middle">
//       <div class="w-3/4 h-full border rounded-md flex justify-center items-center bg-gradient-to-tr from-sky-300 to-blue-600 bg-opacity-80 shadow-sky-300">
//         <h1 class="text-7xl text-center text-white font-bold">ANTRIAN <span class="text-yellow-300">{props.queue.id}</span></h1>
//       </div>
//     </div>
//   );
// });
