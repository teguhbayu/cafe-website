import { cartList } from "@/hooks/cart.hook";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getProducts } from "@/queries/product.query";
import Link from "next/link";

export default async function () {
  //ts
  const cart: cartList[] = JSON.parse(getCookie("cart", { cookies })!);
  const products = await getProducts();
  let sum = 0;
  cart.map((item) => {
    sum += item.qty * products.find((i) => i.id === item.productId)?.price!;
  });
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        {cart.map((item) => (
          <div className="border border-neutral-500 rounded-2xl px-6 py-3   ">
            <h1 className="font-bold text-2xl">
              {products.find((i) => i.id === item.productId)?.name}
            </h1>
            <div className="flex gap-1">
              <p>
                Rp.{" "}
                {products
                  .find((i) => i.id === item.productId)
                  ?.price.toLocaleString()}
              </p>
              <h3>x{item.qty}</h3>
            </div>
            <h2 className="font-bold text-xl">
              Rp.
              {" " +
                (
                  products.find((i) => i.id === item.productId)?.price! *
                  item.qty
                ).toLocaleString()}
            </h2>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-end flex-col text-end items-end">
        <h1>Total:</h1>
        <h2 className="font-semibold text-4xl">Rp. {sum.toLocaleString()}</h2>
        <Link
          href={"/checkout"}
          className="bg-red-500 py-3 px-6 rounded-3xl mt-4 hover:bg-red-700 transition-all duration-300 text-white"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
