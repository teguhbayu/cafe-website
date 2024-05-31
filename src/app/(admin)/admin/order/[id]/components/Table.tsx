"use client";

import { OrderListWithQTY } from "@/types/entityRelations";
import DataTable, { TableColumn } from "react-data-table-component";

const column: TableColumn<OrderListWithQTY>[] = [
  {
    id: "Produk",
    name: "Produk",
    selector: (row) => row.product.name,
    sortable: true,
  },
  {
    id: "Harga Satuan",
    name: "Harga Satuan",
    selector: (row) => `Rp. ${row.product.price.toLocaleString()}`,
    sortable: true,
  },
  {
    id: "Kuantitas",
    name: "Kuantitas",
    selector: (row) => `x${row.qty}`,
    sortable: true,
  },
  {
    id: "Total",
    name: "Total",
    selector: (row) => `Rp. ${(row.product.price * row.qty).toLocaleString()}`,
    sortable: true,
  },
];

export default function TableList({ data }: { data: OrderListWithQTY[] }) {
  return <DataTable columns={column} data={data} pagination />;
}
