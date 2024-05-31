import { getorder } from "@/queries/order.query";
import dynamic from "next/dynamic";
import Image from "next/image";

const TableList = dynamic(() => import("./components/Table"), { ssr: false });

export default async function Orderdetail({
  params,
}: {
  params: { id: string };
}) {
  const order = await getorder({ id: params.id });

  return (
    <div className="w-full h-full flex justify-center items-center py-16 px-16">
      <div className="flex justify-center flex-col items-center">
        <div className="w-[400px] flex flex-col items-center">
          <h1 className="w-full text-start font-bold text-2xl mb-5">
            Bukti Pembayaran
          </h1>
          <div className="w-[200px] h-[300px] overflow-hidden rounded-3xl">
            <Image
              src={order?.payment?.bukti_bayar!}
              alt={`order ${order?.user.name}`}
              width={200}
              height={300}
              unoptimized
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 w-[1000px]">
          <h1 className="text-3xl font-bold">List Pesanan</h1>
          <TableList data={order?.orderlist || []} />
        </div>
      </div>
    </div>
  );
}
