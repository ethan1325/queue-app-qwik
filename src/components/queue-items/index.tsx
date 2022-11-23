import { $, component$, useContext } from "@builder.io/qwik";
import { Queue } from "~/models/Queue";
import { CTX } from "~/routes/index";
import queueService from "~/services/queue-service";

export default component$((queue: Queue) => {
  const state = useContext(CTX);
  const renderMessage = () => {
    if (queue.status === "waiting") {
      return <p>Belum diassign</p>;
    } else {
      return <p class="font-light">Diassign ke meja {queue.table}</p>;
    }
  };

  const returnIndex = $((id: number) => {
    for (let i = 0; i < state.queueList.length; i++) {
      if (id === state.queueList[i].id) {
        return i;
      }
    }
    return 0;
  });

  const queueOnClick = $(async () => {
    queueService.deleteQueue(queue.id);
    state.queueList.splice(await returnIndex(queue.id), 1);
  });

  const onDragStart = $((ev: any)=> {
    setTimeout(() => {
      ev.target.classList.add('hidden');
  }, 0);
  });

  return (
    <>
      <div class="h-full w-full rounded-md  flex items-center justify-center bg-gray-700  text-center flex-col  text-white p-5 min-w-[200px] relative cursor-pointer" preventdefault:drag draggable="true" onDragStart$={onDragStart}>
        <img
          src="Assets/close.png"
          class="absolute top-2 right-2 w-5 cursor-pointer"
          onClick$={queueOnClick}
          alt=""
        />
        <p class="text-2xl font-bold">
          ANTRIAN <span class="text-blue-500">{queue.id}</span>
        </p>
        {renderMessage()}
      </div>
    </>
  );
});
