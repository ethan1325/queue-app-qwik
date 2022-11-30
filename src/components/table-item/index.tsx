import { $, component$, useContext, useStore } from "@builder.io/qwik";
import { Queue } from "~/models/Queue";
import { Table } from "~/models/Table";
import { CTX } from "~/routes/index";
import queueService from "~/services/queue-service";
import tableService from "~/services/table-service";

export default component$((table: Table) => {
  const state = useContext(CTX);
  const tableState = useStore({
    onDrop: false,
  });

  const returnIndex = $((id: number) => {
    for (let i = 0; i < state.tableList.length; i++) {
      if (id === state.tableList[i].id) {
        return i;
      }
    }
    return 0;
  });

  const returnQueueIndex = $((id: number) => {
    for (let i = 0; i < state.queueList.length; i++) {
      if (id === state.queueList[i].id) {
        return i;
      }
    }
    return 0;
  });

  const finishOnclick = $(async () => {
    const updatedTable: Table = {
      id: table.id,
      status: "available",
    };
    tableService.saveTable(updatedTable);
    state.tableList[await returnIndex(table.id)] = updatedTable;
    queueService.deleteQueue(table.queue_id!);
    state.queueList.splice(await returnQueueIndex(table.queue_id!), 1);
  });

  const renderMessage = () => {
    if (table.status === "available") {
      return <p class="font-light">Meja siap melayani</p>;
    } else {
      return (
        <>
          <div>
            <p class="font-light">Melayani antrian {table.queue_id}</p>
          </div>
          <button
            class="bg-blue-700 hover:bg-blue-800 text-white p-1 px-3 rounded absolute bottom-5"
            onClick$={finishOnclick}
          >
            Selesai
          </button>
        </>
      );
    }
  };

  const tableOnDelete = $(async () => {
    tableService.deleteTable(table.id);
    if (table.status === "unavailable" && table.queue_id) {
      const updatedQueue: Queue = {
        id: table.queue_id,
        status: "waiting",
      };
      queueService.saveQueue(updatedQueue);
      state.queueList[await returnQueueIndex(updatedQueue.id)] = updatedQueue;
    }
    state.tableList.splice(await returnIndex(table.id), 1);
  });

  const onDragEnter = $(() => {
    tableState.onDrop = true;
  });

  const onDragOver = $(() => {
    tableState.onDrop = true;
  });

  const onDragLeave = $(() => {
    tableState.onDrop = false;
  });

  const onDrop = $(async () => {
    tableState.onDrop = false;
    if(state.draggedQueue.id !== -1){
      const toSaveTable: Table = {
        id: table.id,
        queue_id: state.draggedQueue.id,
        status: "unavailable",
      };
      tableService.saveTable(toSaveTable);
      state.tableList[await returnIndex(table.id)] = toSaveTable;
      const toSaveQueue: Queue = {
        id: state.draggedQueue.id,
        table: table.id,
        status: "assigned",
      };
      state.queueList[await returnQueueIndex(toSaveQueue.id)] =
        await queueService.saveQueue(toSaveQueue);
      state.draggedQueue = {
        id: -1,
        status: "waiting"
      }
    }
  });

  if (table.status === "available") {
    return (
      <div
        preventdefault:dragenter
        preventdefault:dragover
        class={
          "h-full w-full rounded-md  flex items-center justify-center bg-gray-700  text-center flex-col  text-white p-5 min-w-[200px] relative" +
          (tableState.onDrop ? " border " : "")
        }
        onDragEnter$={onDragEnter}
        onDragOver$={onDragOver}
        onDragLeave$={onDragLeave}
        onDrop$={onDrop}
      >
        <img
          src="Assets/close.png"
          class="absolute top-2 right-2 w-5 cursor-pointer"
          onClick$={tableOnDelete}
          alt=""
        />
        <p class="text-2xl font-bold">
          MEJA <span class="text-blue-500">{table.id}</span>
        </p>
        {renderMessage()}
      </div>
    );
  } else {
    return (
      <div
        class={
          "h-full w-full rounded-md  flex items-center justify-center bg-gray-700  text-center flex-col  text-white p-5 min-w-[200px] relative"
        }
      >
        <img
          src="Assets/close.png"
          class="absolute top-2 right-2 w-5 cursor-pointer"
          onClick$={tableOnDelete}
          alt=""
        />
        <p class="text-2xl font-bold">
          MEJA <span class="text-blue-500">{table.id}</span>
        </p>
        {renderMessage()}
      </div>
    );
  }
});
