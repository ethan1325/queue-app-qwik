import { component$ } from "@builder.io/qwik";
import { Table } from "~/models/Table";

export default component$((table: Table) => {
  const renderMessage = () => {
    if (table.status === "unavailable") {
      return <p>Meja siap melayani</p>;
    } else {
      return (
        <div>
          <p class="font-light">Sedang melayani antrian {table.queue_id}</p>
          <div>test</div>
        </div>
      );
    }
  };

  return (
    <div class="h-full w-full rounded-md  flex items-center justify-center bg-gray-700  text-center flex-col  text-white p-5 min-w-[200px] relative">
      <p class="text-2xl font-bold">
        MEJA <span class="text-blue-500">{table.id}</span>
      </p>
      {renderMessage()}
    </div>
  );
});
