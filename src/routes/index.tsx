import {
  $,
  component$,
  createContext,
  useClientEffect$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import QueueItems from "~/components/queue-items";
import TableItem from "~/components/table-item";
import { Queue } from "~/models/Queue";
import { Table } from "~/models/Table";
import auth from "~/services/auth-service";
import queueService from "~/services/queue-service";
import tableService from "~/services/table-service";

export interface sharedState {
  queueList: Queue[];
  tableList: Table[];
}
export const CTX = createContext<sharedState>("context");
export default component$(() => {
  const state = useStore<sharedState>(
    {
      queueList: [],
      tableList: [],
    },
    { recursive: true }
  );
  useContextProvider(CTX, state);
  useClientEffect$(async () => {
    if (!auth.isLoggedIn()) {
      location.replace("http://localhost:5173/login");
    }
    state.queueList = await queueService.getAll();
    state.tableList = await tableService.getAll();
    state.tableList = state.tableList.sort(
      (a: { id: number }, b: { id: number }) => (a.id > b.id ? 1 : -1)
    );
    state.queueList = state.queueList.sort(
      (a: { id: number }, b: { id: number }) => (a.id > b.id ? 1 : -1)
    );
  });

  const addQueue = $(async () => {
    const savedQueue: Queue = await queueService.addQueue();
    console.log(savedQueue);
    state.queueList.push(savedQueue);
  });

  return (
    <div class="ml-2">
      <h1 class="text-5xl text-white py-3 self-center">Dashboard</h1>
      <div class="w-full min-h-fit h-56 flex justify-between gap-3 pt-3 pb-1 overflow-auto scrollbar pr-4">
        {state.tableList.map((table) => (
          <TableItem {...table} />
        ))}
      </div>
      <h1 class="text-5xl text-white self-center my-3">Antrian</h1>
      <div class="border-b-2 my-5 mr-4"></div>
      <div class="w-full min-h-fit h-48 flex justify-between gap-3 pb-1 overflow-auto scrollbar pr-4">
        {state.queueList.map((queue) => (
          <QueueItems {...queue} />
        ))}
        <div
          class="h-full w-full rounded-md  flex items-center justify-center text-center flex-col  text-white p-5 min-w-[200px] relative cursor-pointer gap-1 hover:border"
          onClick$={addQueue}
          id="addButton"
        >
          <img src="Assets/plus-blue.png" alt="" class="w-13" />
          <p class="font-bold">TAMBAH ANTRIAN</p>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Queue App",
};
