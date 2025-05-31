import { GalleryVerticalEnd } from "lucide-react";

import { AuthForm } from "@/components/blocks/auth-form";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Catan App</h1>
        <AuthForm type="Login" />
      </div>
    </div>
  );
}
