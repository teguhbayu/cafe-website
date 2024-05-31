"use client";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-red-500 hover:bg-red-400 transition-all duration-300 px-4 py-3 text-white disabled:bg-slate-700 rounded-2xl"
      disabled={pending}
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  );
}
