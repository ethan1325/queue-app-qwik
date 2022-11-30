import { $, component$, useContext } from "@builder.io/qwik";
import { Queue } from "~/models/Queue";
import { Table } from "~/models/Table";
import { CTX } from "~/routes/index";
import queueService from "~/services/queue-service";
import tableService from "~/services/table-service";

export default component$((queue: Queue) => {
  const state = useContext(CTX);
  const renderMessage = () => {
    if (queue.status === "waiting") {
      return <p class="font-light">Belum diassign</p>;
    } else {
      return <p class="font-light">Dilayani di meja {queue.table}</p>;
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

  const returnTableIndex = $((id: number) => {
    for (let i = 0; i < state.tableList.length; i++) {
      if (id === state.tableList[i].id) {
        return i;
      }
    }
    return 0;
  });

  const queueOnDelete = $(async () => {
    queueService.deleteQueue(queue.id);
    if (queue.table && queue.status === "assigned") {
      const updatedTable: Table = {
        id: queue.table,
        status: "available",
        queue_id: -1,
      }
      tableService.saveTable(updatedTable);
      state.tableList[await returnTableIndex(updatedTable.id)] = updatedTable;
    }
    state.queueList.splice(await returnIndex(queue.id), 1);
  });

  const onDragStart = $(() => {
    state.draggedQueue = queue;
  });

  if (queue.status === "assigned") {
    return (
      <>
        <div class="h-full w-full rounded-md  flex items-center justify-center bg-gray-700  text-center flex-col  text-white p-5 min-w-[200px] relative cursor-pointer">
          <img
            src="Assets/close.png"
            class="absolute top-2 right-2 w-5 cursor-pointer"
            onClick$={queueOnDelete}
            alt=""
          />
          <p class="text-2xl font-bold">
            ANTRIAN <span class="text-blue-500">{queue.id}</span>
          </p>
          {renderMessage()}
        </div>
      </>
    );
  } else
    return (
      <>
        <div
          class="h-full w-full rounded-md  flex items-center justify-center bg-gray-700  text-center flex-col  text-white p-5 min-w-[200px] relative cursor-pointer"
          draggable="true"
          onDragStart$={onDragStart}
        >
          <img
            src="Assets/close.png"
            class="absolute top-2 right-2 w-5 cursor-pointer"
            onClick$={queueOnDelete}
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
