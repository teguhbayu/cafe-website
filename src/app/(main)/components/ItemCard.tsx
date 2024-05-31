"use client";

import { products } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cartList, useCartItems } from "@/hooks/cart.hook";
import { IoMdAddCircle } from "react-icons/io";
import { FaCircleMinus } from "react-icons/fa6";

export default function Products({ products }: { products: products[] }) {
  const cart = useCartItems();
  return (
    <div className="w-full flex items-center justify-center flex-wrap gap-8">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <div className="rounded-xl w-[300px] h-[200px] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                unoptimized
                className="object-cover w-full h-full"
              />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="font-bold text-2xl">{product.name}</h1>
            <h2>{product.price}</h2>
            <h2>Stok: {product.stock}</h2>
            <p>{product.description}</p>
            <div className="flex gap-3 mt-2">
              {cart.cart.filter((item) => {
                return item.productId === product.id;
              })[0]?.qty > 0 && (
                <button
                  onClick={() => {
                    cart.addToCart({
                      productId: product.id,
                      qty:
                        (cart.cart.filter((item) => {
                          return item.productId === product.id;
                        })[0]?.qty || 0) - 1,
                    });
                  }}
                >
                  <FaCircleMinus className="text-2xl" />
                </button>
              )}
              <p>
                {cart.cart.filter((item) => {
                  return item.productId === product.id;
                })[0]?.qty || 0}
              </p>
              {(cart.cart.filter((item) => {
                return item.productId === product.id;
              })[0]?.qty || 0) < product.stock && (
                <button
                  onClick={() => {
                    cart.addToCart({
                      productId: product.id,
                      qty:
                        (cart.cart.filter((item) => {
                          return item.productId === product.id;
                        })[0]?.qty || 0) + 1,
                    });
                  }}
                >
                  <IoMdAddCircle className="text-2xl" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
