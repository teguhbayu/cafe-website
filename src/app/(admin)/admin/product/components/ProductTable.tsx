"use client";

import { products } from "@prisma/client";
import { useRouter } from "next/navigation";
import DataTable, { TableColumn } from "react-data-table-component";

const columns: TableColumn<products>[] = [
  {
    name: "Nama Product",
    id: "nama",
    sortable: true,
    selector: (row) => row.name,
  },
  {
    name: "Stock",
    id: "stock",
    sortable: true,
    selector: (row) => row.stock,
  },
  {
    name: "Price",
    id: "price",
    sortable: true,
    selector: (row) => `Rp. ${row.price.toLocaleString()}`,
  },
];

export default function ProductTable({ data }: { data: products[] }) {
  const router = useRouter();

  return (
    <DataTable
      pagination
      columns={columns}
      data={data}
      className="transition-all duration-500"
      onRowClicked={(row) => {
        router.push(`/admin/product/${row.id}`);
      }}
    />
  );
}
