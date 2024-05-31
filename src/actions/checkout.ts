"use server";

import { cartList } from "@/hooks/cart.hook";
import prisma from "@/lib/prisma";
import { getProduct, updateProduct } from "@/queries/product.query";
import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { PaymentMethod } from "@prisma/client";
import { deleteCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { uploadBuktiTF } from "./fileUpload";

const SQSclient = new SQSClient({});
const sqsQueueUrl = "";
const snsClient = new SNSClient();
const topicArn = "";

export default async function checkout(
  data: FormData,
  cart: cartList[],
  userId: string
) {
  const image = data.get("bukti") as File;
  const method = data.get("method") as PaymentMethod;
  const total = parseInt(data.get("total") as string);

  let sqsAttr: any[];

  try {
    const upImage = await uploadBuktiTF(Buffer.from(await image.arrayBuffer()));

    const db = await prisma.order.create({
      data: {
        orderlist: {
          create: [...cart],
        },
        user: { connect: { id: userId } },
        payment: {
          create: {
            bukti_bayar: upImage?.link!,
            method,
            total,
            user: { connect: { id: userId } },
          },
        },
      },
    });
    cart.map(async (item) => {
      const productQTY = await getProduct(
        { id: item.productId },
        { stock: true }
      );
      await updateProduct(
        { id: item.productId },
        { stock: productQTY?.stock! - item.qty }
      );
      sqsAttr.push({ id: item.productId, qty: item.qty });
    });

    await snsClient.send(
      new PublishCommand({
        Message: `Order masuk: ${db.id}`,
        TopicArn: topicArn,
      })
    );

    await SQSclient.send(
      new SendMessageCommand({
        QueueUrl: sqsQueueUrl,
        DelaySeconds: 10,
        MessageAttributes: {
          Order: {
            DataType: "String",
            StringValue: JSON.stringify(sqsAttr!),
          },
        },
        MessageBody: `Order ${db.id}`,
      })
    );

    deleteCookie("cart", { cookies });

    revalidatePath("/", "layout");

    return { success: true, message: "Berhasil menaruh order!" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Gagal order!" };
  }
}
