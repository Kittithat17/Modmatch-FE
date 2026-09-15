import { Button } from "@/components/ui/button";

import { GoogleIcon } from "./google-icon";

// Google sign-in is not built yet. The button stays visible so the page
// matches the design, but disabled. Enable it here once the backend
// supports Google OAuth; login and sign-up both use this component.
export function GoogleButton() {
  return (
    <Button type="button" variant="outline" className="h-10" disabled>
      <GoogleIcon />
      Continue with Google
      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
        Soon
      </span>
    </Button>
  );
}
