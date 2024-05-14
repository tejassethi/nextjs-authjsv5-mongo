"use server";

import { getUser } from "@/lib/actions/user.actions";
import { User } from "@/lib/models/userModel";
import { hash } from "bcryptjs";

import { gen } from "n-digit-token";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email: string) => {
  console.log(email);
  const code = gen(6);
  try {
    const user = await getUser(email);
    if (user.success) throw new Error("Email already registered");
    const { data, error } = await resend.emails.send({
      from: "Paste Words <admin@pastewords.com>",
      to: [email],
      subject: "Paste Words Verification Code",
      html: `<strong>${code}</strong>`,
    });
    console.log(code, data);
    if (error) throw new Error("Failed to send email. Try again later");
    return { success: true, code };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export { sendEmail };
