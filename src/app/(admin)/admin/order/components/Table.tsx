"use client";

import { OrderWithUser } from "@/types/entityRelations";
import DataTable, { TableColumn } from "react-data-table-component";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const column: TableColumn<OrderWithUser>[] = [
  {
    id: "id",
    name: "id",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    id: "Ordered by",
    name: "Ordered by",
    selector: (row) => row.user.name!,
    cell: (row) => (
      <div className="gap-3 flex items-center">
        <div className="h-5 w-5 rounded-full overflow-hidden">
          <Image
            src={row.user.image}
            alt={"pfp"}
            width={20}
            height={20}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <p>{row.user.name}</p>
      </div>
    ),
    sortable: true,
  },
  {
    id: "Ordered",
    name: "Ordered at",
    selector: (row) => row.dateOrdered.toDateString(),
    sortable: true,
  },
  {
    id: "Total",
    name: "Total",
    selector: (row) => `Rp. ${row.payment?.total!}`,
    sortable: true,
  },
];

export default function Table({ data }: { data: OrderWithUser[] }) {
  const router = useRouter();

  return (
    <DataTable
      columns={column}
      data={data}
      pagination
      onRowClicked={(row) => {
        router.push(`/admin/order/${row.id}`);
      }}
      className="hover:cursor-pointer"
    />
  );
}
