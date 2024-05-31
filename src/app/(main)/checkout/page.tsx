"use client";
import checkout from "@/actions/checkout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cartList } from "@/hooks/cart.hook";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "./components/SubmitButton";

async function confirm(data: FormData, cart: cartList[], userId: string) {
  const res = await checkout(data, cart, userId);
  const toastId = toast.loading("Checkout...");

  if (res.success) {
    toast.success(res.message, { id: toastId });
    return redirect("/");
  }
  return toast.error(res.message, { id: toastId });
}

export default function Checkout() {
  const { data: session } = useSession();
  const cookie: cartList[] = JSON.parse(
    getCookie("cart", { path: "/" }) || "[]"
  );
  return (
    <form
      action={(data: FormData) => confirm(data, cookie, session?.user?.id!)}
      className="flex flex-col gap-8"
    >
      <div>
        <label htmlFor="">Metode Pemabayaran</label>
        <Select name="method" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih metode pembayaran" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Metode</SelectLabel>
              <SelectItem value="CASH">Cash</SelectItem>
              <SelectItem value="QRIS">QRIS</SelectItem>
              <SelectItem value="TF">Transfer Bank</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="total">Total</label>
        <input
          type="number"
          name="total"
          id="total"
          required
          className="py-4 px-3 rounded-2xl border border-slate-400 w-full"
        />
      </div>
      <div>
        <label htmlFor="file">Bukti Transfer</label>
        <input
          type="file"
          accept="image/*"
          id="file"
          name="bukti"
          required
          className="py-4 px-3 rounded-2xl border border-slate-400 w-full"
        />
      </div>
      <div className="w-full flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
