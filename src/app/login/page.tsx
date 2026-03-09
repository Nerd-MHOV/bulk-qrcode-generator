"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-xl font-semibold">QR Generator</h1>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Digite a senha"
            required
          />
        </div>
        {state?.error && (
          <p className="text-sm text-red-500">{state.error}</p>
        )}
        <Button type="submit" disabled={pending}>
          {pending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
