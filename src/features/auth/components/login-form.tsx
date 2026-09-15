"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { login } from "../api";
import { describeAuthError } from "../errors";
import { submitWithoutReset } from "../submit-without-reset";
import type { LoginFormState } from "../types";
import { AuthCard, authLinkClassName } from "./auth-card";
import { GoogleButton } from "./google-button";

const initialState: LoginFormState = { error: null };

export function LoginForm() {
  const router = useRouter();

  const [state, submit, pending] = useActionState(
    async (
      _previous: LoginFormState,
      formData: FormData,
    ): Promise<LoginFormState> => {
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      try {
        await login({ email, password });
      } catch (error) {
        return {
          error: describeAuthError(error, {
            401: "Incorrect email or password.",
          }),
        };
      }

      router.push("/");
      return { error: null };
    },
    initialState,
  );

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your ModMatch account"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={authLinkClassName}>
            Sign up free
          </Link>
        </>
      }
    >
      <form onSubmit={submitWithoutReset(submit)}>
        <FieldGroup>
          <Field>
            <GoogleButton />
          </Field>

          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
            or
          </FieldSeparator>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-10"
            />
          </Field>

          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                href="/forgot-password"
                className="ml-auto text-sm text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className="h-10"
            />
          </Field>

          {state.error && <FieldError>{state.error}</FieldError>}

          <Field>
            <Button type="submit" disabled={pending} className="h-10">
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </AuthCard>
  );
}
