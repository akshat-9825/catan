import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthFormConfig } from "@/app/auth/auth-config";
import { UseFormReturn } from "react-hook-form";
import { AuthFormData } from "@/lib/schema/auth-schemas";

interface EmailPasswordFormProps {
  config: AuthFormConfig;
  form: UseFormReturn<AuthFormData>;
  onSubmit: (data: AuthFormData) => void;
}

export function EmailPasswordForm({
  config,
  form,
  onSubmit,
}: EmailPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="grid gap-6">
      {config.fields.map((field) => (
        <div key={field.name} className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.showForgotPassword && (
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            )}
          </div>
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name as keyof AuthFormData)}
            className={
              errors[field.name as keyof AuthFormData]
                ? "border-destructive"
                : ""
            }
          />
          {errors[field.name as keyof AuthFormData] && (
            <p className="text-sm text-destructive">
              {errors[field.name as keyof AuthFormData]?.message}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        {isSubmitting ? "Loading..." : config.submitButtonText}
      </Button>
    </div>
  );
}
