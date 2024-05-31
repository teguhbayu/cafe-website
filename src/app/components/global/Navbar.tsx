"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useCartItems } from "@/hooks/cart.hook";

export default function Navbar() {
  const [isShown, setIsShown] = useState(false);
  const { status, data: session } = useSession();
  const cart = useCartItems();

  return (
    <nav className="bg-[#f73f3f] h-20 w-full flex justify-between items-center px-8 py-4">
      <div>
        <Link href={"/"} className="text-white text-3xl font-bold">
          Cafe.
        </Link>
      </div>
      <div>
        {status === "authenticated" ? (
          <div className="relative flex gap-8 items-center">
            <Link
              href={"/cart"}
              className="relative flex text-white hover:text-[#ececec] transition-all duration-300"
            >
              <FaCartShopping className="text-4xl" />
              <p className="bg-white rounded-full w-4 h-4 absolute -top-1 -right-1 text-red-600 flex text-xs items-center justify-center text-center">
                {cart.cartCount}
              </p>
            </Link>
            <button
              className="rounded-full w-10 h-10 overflow-hidden"
              onClick={() => setIsShown(!isShown)}
              title={session.user?.name}
            >
              <Image
                src={session.user?.image!}
                alt={session.user?.name!}
                width={100}
                height={100}
                unoptimized
                className="object-fill w-auto h-full"
              />
            </button>
            <div
              className={`bg-neutral-800 absolute right-0 top-[50px] w-[300px] rounded-xl px-4 py-6 ${
                isShown ? "" : "hidden"
              }`}
            >
              <h2 className="text-white font-bold">{session.user?.name}</h2>
              <h2 className="text-white">{session.user?.email}</h2>
              <div className="flex flex-col gap-3 mt-4">
                {session.user?.role === "ADMIN" ? (
                  <Link
                    className={`w-full bg-neutral-800 hover:bg-neutral-600 transition-all duration-300 px-3 py-4 text-white rounded-xl`}
                    href={"/admin"}
                  >
                    Admin
                  </Link>
                ) : (
                  <></>
                )}

                <button
                  className={`w-full bg-neutral-800 hover:bg-neutral-600 transition-all duration-300 px-3 py-4 text-red-500 rounded-xl`}
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : status === "loading" ? (
          <></>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="rounded-2xl text-red-500 bg-white px-6 py-4 hover:bg-red-200 transition-all duration-300"
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
