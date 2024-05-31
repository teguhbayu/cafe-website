"use server";

import { createProduct, updateProduct } from "@/queries/product.query";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { uploadProduct } from "./fileUpload";

export async function addProduct(data: FormData) {
  const stock = parseInt(data.get("stock") as string);
  const price = parseInt(data.get("harga") as string);
  const name = data.get("nama") as string;
  const description = data.get("deskripsi") as string;
  const image = data.get("foto") as File;

  try {
    const file = await uploadProduct(Buffer.from(await image.arrayBuffer()));

    await createProduct({
      description,
      image: file?.link ?? "",
      name,
      price,
      stock,
    });

    revalidatePath("/", "layout");

    return { success: true, message: "Berhasil menambahkan product!" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Gagal Menambahkan!" };
  }
}

export async function editProduct(data: FormData, productId: string) {
  const stock = parseInt(data.get("stock") as string) ?? undefined;
  const price = parseInt((data.get("harga") as string) ?? undefined);
  const name = (data.get("nama") as string) ?? undefined;
  const description = (data.get("deskripsi") as string) ?? undefined;
  const image = (data.get("foto") as File) ?? undefined;

  try {
    let file;
    if (image)
      file = await uploadProduct(Buffer.from(await image.arrayBuffer()));

    await updateProduct(
      { id: productId },
      {
        description,
        image: file?.link || "",
        name,
        price,
        stock,
      }
    );

    revalidatePath("/", "layout");

    return { success: true, message: "Berhasil mengupdate product!" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Gagal Mengupdate!" };
  }
}
