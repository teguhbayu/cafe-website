import { getProduct } from "@/queries/product.query";
import Product from "./components/Form";

export default async function ProductEdit({
  params,
}: {
  params: { id: string };
}) {
  if (params.id !== "new") return <Product />;

  const product = await getProduct({ id: params.id });
  return <Product edit product={product!} />;
}
