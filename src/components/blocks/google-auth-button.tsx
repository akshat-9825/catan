import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/lib/icons";
import { AuthFormConfig } from "@/app/auth/auth-config";

interface GoogleAuthButtonProps {
  config: AuthFormConfig;
  onGoogleAuth?: () => void;
}

export function GoogleAuthButton({
  config,
  onGoogleAuth,
}: GoogleAuthButtonProps) {
  if (!config.showGoogleAuth) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        type="button"
        onClick={onGoogleAuth}
      >
        <GoogleIcon className="size-4" />
        {config.type} with Google
      </Button>
    </div>
  );
}
