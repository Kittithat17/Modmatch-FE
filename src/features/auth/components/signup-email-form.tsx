"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { register } from "../api";
import { describeAuthError } from "../errors";
import { submitWithoutReset } from "../submit-without-reset";
import type { SignupFormState } from "../types";
import { AuthCard, authLinkClassName } from "./auth-card";

const MIN_PASSWORD_LENGTH = 8;

const initialState: SignupFormState = { fieldErrors: {}, error: null };

export function SignupEmailForm({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [state, submit, pending] = useActionState(
    async (
      _previous: SignupFormState,
      formData: FormData,
    ): Promise<SignupFormState> => {
      const password = String(formData.get("password") ?? "");
      const confirmPassword = String(formData.get("confirmPassword") ?? "");

      const fieldErrors: SignupFormState["fieldErrors"] = {};
      if (password.length < MIN_PASSWORD_LENGTH) {
        fieldErrors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
      }
      if (confirmPassword !== password) {
        fieldErrors.confirmPassword = "Passwords don't match.";
      }
      if (fieldErrors.password || fieldErrors.confirmPassword) {
        return { fieldErrors, error: null };
      }

      try {
        await register({
          firstName: String(formData.get("firstName") ?? "").trim(),
          lastName: String(formData.get("lastName") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          password,
          marketingOptIn: formData.get("marketing") === "on",
        });
      } catch (error) {
        return {
          fieldErrors: {},
          error: describeAuthError(error, {
            409: "An account with this email already exists.",
          }),
        };
      }

      router.push("/login");
      return { fieldErrors: {}, error: null };
    },
    initialState,
  );

  return (
    <AuthCard
      title="Create your account"
      description="Sign up with your email"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className={authLinkClassName}>
            Sign in
          </Link>
        </>
      }
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="-ml-2 mb-3 text-muted-foreground"
      >
        <ArrowLeftIcon />
        Back
      </Button>

      <form onSubmit={submitWithoutReset(submit)}>
        <FieldGroup className="gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <FieldLabel htmlFor="firstName">First name</FieldLabel>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                placeholder="Jane"
                required
                className="h-10"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last name</FieldLabel>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                placeholder="Doe"
                required
                className="h-10"
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="signup-email">Email</FieldLabel>
            <Input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-10"
            />
          </Field>

          <Field data-invalid={Boolean(state.fieldErrors.password)}>
            <FieldLabel htmlFor="signup-password">Password</FieldLabel>
            <Input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder={`Min. ${MIN_PASSWORD_LENGTH} characters`}
              aria-invalid={Boolean(state.fieldErrors.password)}
              required
              className="h-10"
            />
            <FieldError>{state.fieldErrors.password}</FieldError>
          </Field>

          <Field data-invalid={Boolean(state.fieldErrors.confirmPassword)}>
            <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
            <Input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={Boolean(state.fieldErrors.confirmPassword)}
              required
              className="h-10"
            />
            <FieldError>{state.fieldErrors.confirmPassword}</FieldError>
          </Field>

          <Field orientation="horizontal">
            <Checkbox
              id="terms"
              name="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            />
            <FieldLabel htmlFor="terms" className="font-normal text-muted-foreground">
              <span>
                I agree to the{" "}
                <Link href="/terms" className={authLinkClassName}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className={authLinkClassName}>
                  Privacy Policy
                </Link>
              </span>
            </FieldLabel>
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="marketing" name="marketing" />
            <FieldLabel htmlFor="marketing" className="font-normal text-muted-foreground">
              Send me product updates and promotions
            </FieldLabel>
          </Field>

          {state.error && <FieldError>{state.error}</FieldError>}

          <Field>
            <Button
              type="submit"
              disabled={!agreedToTerms || pending}
              className="h-10"
            >
              {pending ? "Creating account…" : "Create account"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
