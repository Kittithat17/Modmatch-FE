"use client";

import { useState } from "react";

import { SignupEmailForm } from "./signup-email-form";
import { SignupOptions } from "./signup-options";

// Sign-up is two steps on one URL: pick a method, then fill in the email form.
export function SignupFlow() {
  const [method, setMethod] = useState<"choose" | "email">("choose");

  if (method === "email") {
    return <SignupEmailForm onBack={() => setMethod("choose")} />;
  }
  return <SignupOptions onChooseEmail={() => setMethod("email")} />;
}
