import { getProducts } from "@/queries/product.query";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProductTable = dynamic(() => import("./components/ProductTable"), {
  ssr: false,
});

export default async function Product() {
  const products = await getProducts();

  return (
    <div className="w-full h-full py-16 px-20 flex items-center justify-center">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Products</h1>
          <Link
            href={"/admin/product/new"}
            className="bg-red-500 px-8 py-3 rounded-3xl text-white transition-all duration-300 hover:bg-red-400"
          >
            Add
          </Link>
        </div>
        <ProductTable data={products} />
      </div>
    </div>
  );
}
