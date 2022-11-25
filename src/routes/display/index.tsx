import { $, component$, useClientEffect$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import LargeBox from "~/components/large-box";
import SmallBox from "~/components/small-box";
import { Queue } from "~/models/Queue";
import auth from "~/services/auth-service";
import queueService from "~/services/queue-service";

export default component$(() => {
  const state: any = useStore({ queueList: [] });
  useClientEffect$(async () => {
    if (!auth.isLoggedIn()) {
      location.replace("http://localhost:5173/login");
    }
    state.queueList = await queueService.getAll();
    // console.log(state.queueList);
  });

  const logout = $(() => {
    auth.logout();
  });
  const queueList: Queue[] = state.queueList.sort(
    (a: { id: number }, b: { id: number }) => (a.id > b.id ? 1 : -1)
  );

  const returnFirstElement = () => {
    return { ...queueList[0] };
  };

  // const queueList: Queue[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const nextQueue: Queue[] = queueList.slice(0, 1);
  let displaySize = 0;
  (queueList.length > 4) ? displaySize = 4 : displaySize = queueList.length;
  const waitingQueue: Queue[] = queueList.slice(1, displaySize+ 1);
  // console.log(queueList[0]);
  // const newQueue: Queue = queueList[0];
  // console.log(newQueue.id);
  // const queueLost: Queue[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <div class="h-screen w-screen bg-gray-900">
      <a href="/">
        <button class="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute top-0 right-0 m-3">
          BACK
        </button>
      </a>
      {nextQueue.map((queues) => (
        <LargeBox {...queues}></LargeBox>
      ))}   
      {/* <LargeBox {...queueList[3]}></LargeBox> */}
      <div class="w-full h-2/5 flex justify-between gap-3 p-3 pt-0">
        {waitingQueue.map((queues) => (
          <SmallBox {...queues} />
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Queue App",
};
