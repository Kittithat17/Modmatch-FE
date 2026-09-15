import type { Metadata } from "next";

import { SignupFlow } from "@/features/auth/components/signup-flow";

export const metadata: Metadata = {
  title: "Create account · ModMatch",
};

export default function SignupPage() {
  return <SignupFlow />;
}
