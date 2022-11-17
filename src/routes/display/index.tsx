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
  const waitingQueue: Queue[] = queueList.slice(1, queueList.length+1);
  // console.log(queueList[0]);
  // const newQueue: Queue = queueList[0];
  // console.log(newQueue.id);
  // const queueLost: Queue[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <div class="h-screen w-screen bg-frost">
      <img
        src="logout.png"
        alt=""
        class="absolute top-0 right-0 p-2 cursor-pointer"
        onClick$={logout}
      />
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