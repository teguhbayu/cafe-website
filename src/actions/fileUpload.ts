"use server";

import { randomFileName } from "@/lib/utils";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fileType, { fileTypeFromStream, fileTypeFromBuffer } from "file-type";

const s3cli = new S3Client({ region: "us-east-1" });
const Bucket = "bucket-teguhbayupratama-xit2-37";

export async function uploadBuktiTF(file: Buffer) {
  const filetype = (await fileTypeFromBuffer(file))?.ext;
  console.log(filetype);
  const filename = randomFileName() + "." + filetype;
  try {
    const upload = await s3cli.send(
      new PutObjectCommand({
        Bucket,
        Key: `bukti-tf/${filename}`,
        Body: file,
      })
    );

    return {
      link: `https://${Bucket}.s3.amazonaws.com/bukti-tf/${filename}`,
      status: upload.$metadata.httpStatusCode,
    };
  } catch (e) {
    console.log(e);
  }
}

export async function uploadProduct(file: Buffer) {
  const filetype = (await fileType.fileTypeFromBuffer(file))?.ext;
  const filename = randomFileName() + "." + filetype;
  try {
    const upload = await s3cli.send(
      new PutObjectCommand({
        Bucket,
        Key: `products/${filename}`,
        Body: file,
      })
    );

    return {
      link: `https://${Bucket}.s3.amazonaws.com/products/${filename}`,
      status: upload.$metadata.httpStatusCode,
    };
  } catch (e) {
    console.log(e);
  }
}
