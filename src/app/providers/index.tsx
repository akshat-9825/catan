import { ErrorBoundary } from "@/components/fallbacks";
import { ToastProvider } from "@/components/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
        <ToastProvider />
      </NextThemesProvider>
    </ErrorBoundary>
  );
}
