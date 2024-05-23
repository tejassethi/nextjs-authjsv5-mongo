"use server";

import { revalidatePath } from "next/cache";
import { Drop } from "@/lib/models/userModel";
import { connectToDatabase } from "../database/db";
import { compare, hash } from "bcryptjs";
import { generate, count } from "random-words";

export async function createDrop(
  user_id?: any,
  expires_at?: any,
  link?: any,
  text?: any,
  file_name?: any,
  file_size?: any,
  file_url?: any
) {
  try {
    await connectToDatabase();

    const words = await generate({
      exactly: 1,
      wordsPerString: 2,
      minLength: 2,
      maxLength: 5,
      separator: "-",
    });

    const dropData: any = {
      words: words[0],
    };
    if (user_id) dropData.user_id = user_id;
    if (expires_at) dropData.expires_at = expires_at;
    if (link) dropData.link = link;
    if (text) dropData.text = text;
    if (file_name) dropData.file_name = file_name;
    if (file_size) dropData.file_size = file_size;
    if (file_url) dropData.file_url = file_url;

    const dropRes = await Drop.create(dropData);

    console.log(dropRes);

    return { success: true, message: JSON.parse(JSON.stringify(dropRes)) };
  } catch (error) {
    // delete file too
    console.log(error);
    return { success: false, message: "An error occurred. Please try again" };
  }
}
