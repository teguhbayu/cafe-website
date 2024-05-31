import { getServerSession } from "@/lib/next-auth";
import { getProducts } from "@/queries/product.query";
import Image from "next/image";
import Form from "./components/Form";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import Products from "./components/ItemCard";

export default async function Home() {
  const session = await getServerSession();

  const products = await getProducts({});

  return (
    <>
      <Products products={products} />
    </>
  );
}
