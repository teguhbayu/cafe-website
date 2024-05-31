"use client";
import { products } from "@prisma/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";
import { addProduct, editProduct } from "@/actions/admin";

async function tambah(data: FormData) {
  const res = await addProduct(data);
  const toastId = toast.loading("Menambahkan...");

  if (res.success) {
    toast.success(res.message, { id: toastId });
    return redirect("/");
  }
  return toast.error(res.message, { id: toastId });
}

async function Edit(data: FormData, productId: string) {
  const res = await editProduct(data, productId);
  const toastId = toast.loading("Checkout...");

  if (res.success) {
    toast.success(res.message, { id: toastId });
    return redirect("/");
  }
  return toast.error(res.message, { id: toastId });
}

export default function Product({
  edit,
  product,
}: {
  edit?: boolean;
  product?: products;
}) {
  return (
    <form
      action={
        edit
          ? (data: FormData) => {
              Edit(data, product?.id!);
            }
          : tambah
      }
      className="flex flex-col gap-8"
    >
      <div>
        <label htmlFor="nama">Nama Produk</label>
        <input
          type="text"
          name="nama"
          id="nama"
          defaultValue={edit ? product?.name : undefined}
          required={edit ? false : true}
          className="py-4 px-3 rounded-2xl border border-slate-400 w-full"
        />
      </div>
      <div>
        <label htmlFor="deskripsi">Deskripsi</label>
        <input
          type="text"
          name="deskripsi"
          id="deskripsi"
          defaultValue={edit ? product?.description : undefined}
          required={edit ? false : true}
          className="py-4 px-3 rounded-2xl border border-slate-400 w-full"
        />
      </div>
      <div>
        <label htmlFor="harga">Harga</label>
        <input
          type="number"
          name="harga"
          id="harga"
          defaultValue={edit ? product?.price : undefined}
          required={edit ? false : true}
          className="py-4 px-3 rounded-2xl border border-slate-400 w-full"
        />
      </div>
      <div>
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          name="stock"
          id="stock"
          defaultValue={edit ? product?.stock : undefined}
          required={edit ? false : true}
          className="py-4 px-3 rounded-2xl border border-slate-400 w-full"
        />
      </div>
      <div>
        <label htmlFor="file">Foto Product</label>
        <input
          type="file"
          accept="image/*"
          id="file"
          name="foto"
          required={edit ? false : true}
          className="py-4 px-3 rounded-2xl border border-slate-400 w-full"
        />
      </div>
      <div className="w-full flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
