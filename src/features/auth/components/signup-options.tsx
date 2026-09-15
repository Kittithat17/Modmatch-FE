import { MailIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { AuthCard, authLinkClassName } from "./auth-card";
import { GoogleButton } from "./google-button";

export function SignupOptions({ onChooseEmail }: { onChooseEmail: () => void }) {
  return (
    <AuthCard
      title="Create your account"
      description="Join ModMatch — free to start"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className={authLinkClassName}>
            Sign in
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <GoogleButton />
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={onChooseEmail}
        >
          <MailIcon />
          Continue with email
        </Button>
      </div>

      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </AuthCard>
  );
}
