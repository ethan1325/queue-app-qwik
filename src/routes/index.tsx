import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import LargeBox from "~/components/large-box";
import SmallBox from "~/components/small-box";
import { Queue } from "~/models/Queue";

export default component$(() => {
  
  const queueList: Queue[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <div class="h-screen w-screen bg-frost">
      <LargeBox {...queueList[0]}></LargeBox>
      <div class="w-full h-2/5 flex justify-between gap-3 p-3 pt-0">
        {queueList.map((queues) => (
          <SmallBox {...queues}/>
        ))}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Queue App",
};
