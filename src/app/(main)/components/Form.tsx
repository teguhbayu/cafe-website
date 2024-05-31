"use client";

import { Session } from "next-auth";
import { useFormStatus } from "react-dom";
import Spinner from "@/app/components/global/Icons";
import { toast } from "sonner";
import { submitForm } from "@/actions/form";
import { useRef } from "react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-center py-3 px-6 rounded-xl bg-red-500 text-white hover:bg-red-400 transition-all duration-300 disabled:bg-neutral-600"
    >
      {pending ? (
        <div className="w-[53px] flex justify-center items-center">
          <Spinner className="animate-spin" />
        </div>
      ) : (
        "Submit"
      )}
    </button>
  );
}

async function Submit(data: FormData, id: string) {
  const toastId = toast.loading("Menambahkan buku...");
  const result = await submitForm(data, id);
  if (result.success) return toast.success("Berhasil!", { id: toastId });
  else return toast.error("Gagal!", { id: toastId });
}

export default function Form({ session }: { session: Session }) {
  const ref = useRef(null);

  return (
    <form
      ref={ref}
      action={async (data: FormData) => await Submit(data, session.user?.id!)}
      className="py-4 px-7 border border-neutral-400 rounded-2xl flex flex-col gap-3"
    >
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="">Judul</label>
        <input
          type="text"
          name="title"
          id=""
          className="rounded-3xl border border-neutral-300 px-6 py-3"
          required
        />
      </div>
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="">Tahun Rilis</label>
        <input
          type="number"
          name="year"
          id=""
          className="rounded-3xl border border-neutral-300 px-6 py-3"
          required
        />
      </div>
      <div className="w-full flex justify-center">
        <SubmitButton />
      </div>
    </form>
  );
}
