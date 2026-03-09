"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(_prevState: unknown, formData: FormData) {
  const password = formData.get("password") as string;

  if (password !== process.env.APP_PASSWORD) {
    return { error: "Senha incorreta." };
  }

  (await cookies()).set("auth-session", process.env.AUTH_SECRET!, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // remove maxAge para sessão temporária (expira ao fechar o browser)
  });

  redirect("/");
}
