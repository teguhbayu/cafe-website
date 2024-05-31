import { getorders } from "@/queries/order.query";
import dynamic from "next/dynamic";

const Table = dynamic(() => import("./components/Table"), {
  ssr: false,
});

export default async function Order() {
  const orders = await getorders();
  return (
    <div className="px-24 py-21">
      <Table data={orders} />
    </div>
  );
}
