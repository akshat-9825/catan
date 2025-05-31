import { AuthFormConfig } from "@/app/auth/auth-config";

interface AuthToggleProps {
  config: AuthFormConfig;
  onToggle: () => void;
}

export function AuthToggle({ config, onToggle }: AuthToggleProps) {
  return (
    <div className="text-center text-sm">
      {config.toggleText}{" "}
      <button
        type="button"
        onClick={onToggle}
        className="underline underline-offset-4 hover:text-primary cursor-pointer"
      >
        {config.toggleLinkText}
      </button>
    </div>
  );
}
