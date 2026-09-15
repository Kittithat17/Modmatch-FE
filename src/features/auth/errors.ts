import { ApiError } from "@/lib/api-client";

// Turns a failed auth request into a message a user can act on.
// Pass per-status messages for the cases a form knows how to explain,
// e.g. 401 on login or 409 on sign-up.
export function describeAuthError(
  error: unknown,
  statusMessages: Partial<Record<number, string>> = {},
): string {
  if (error instanceof ApiError) {
    return (
      statusMessages[error.status] ??
      "Something went wrong on our side. Please try again."
    );
  }
  return "Can't reach the server. Check your connection and try again.";
}
